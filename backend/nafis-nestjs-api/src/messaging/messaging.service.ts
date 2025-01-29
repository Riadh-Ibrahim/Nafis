import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageRequestEntity, StatutMessageRequest } from './entities/message-request.entity';
import { ConversationEntity } from './entities/conversation.entity';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { UpdateMessageStatusDto } from './dto/update-message-request.dto';
import { ConversationDto } from './dto/conversation.dto';
import { MessageDto } from './dto/message.dto';
import { MessagingGateway } from './messaging.gateway';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(MessageRequestEntity)
    private readonly messageRequestRepository: Repository<MessageRequestEntity>,

    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,

    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,

    private readonly gateway: MessagingGateway,
  ) {}

  //--------------------------------------------------------------------------------------
  // Create a new message request from a patient to a doctor.
  async createRequest(createRequestDto: CreateMessageRequestDto): Promise<MessageRequestEntity> {
    const { patientId, doctorId } = createRequestDto;

    // Step 1: Check if a pending request already exists for this patient and doctor
    const existingRequest = await this.messageRequestRepository.findOne({
      where: { patientId, doctorId, statut: StatutMessageRequest.EN_ATTENTE },
    });

    if (existingRequest) {
      throw new BadRequestException(
        'A pending request already exists for this doctor and patient.',
      );
    }

    // Step 2: Create a new message request
    const newRequest = this.messageRequestRepository.create({
      patientId,
      doctorId,
      statut: StatutMessageRequest.EN_ATTENTE,
      dateCreation: new Date(),
    });

    const savedRequest = await this.messageRequestRepository.save(newRequest);

    // Notify the doctor of the new request
    await this.gateway.notifyNewRequest(doctorId, savedRequest);

    // Step 3: Save the request to the database
    return savedRequest;
  }

  //-----------------------------------------------------------------------------------------
  // Fetch all message requests for a specific doctor
  async getRequests(doctorId: string): Promise<MessageRequestEntity[]> {
    // Step 1: Validate the doctorId
    const parsedDoctorId = parseInt(doctorId, 10);
    if (isNaN(parsedDoctorId)) {
      throw new BadRequestException('Invalid doctorId. It must be a numeric value.');
    }

    // Step 2: Fetch all requests for the doctor
    const requests = await this.messageRequestRepository.find({
      where: { doctorId: parsedDoctorId },
      order: { dateCreation: 'DESC' },
    });

    // Step 3: Handle no requests found
    if (!requests.length) {
      throw new NotFoundException('No requests found for this doctor.');
    }

    return requests;
  }
  //-----------------------------------------------------------------------------------------
  // Update the status of a message request
  async updateRequestStatus(
    requestId: string,
    updateStatusDto: UpdateMessageStatusDto,
  ): Promise<MessageRequestEntity> {
    // Step 1: Parse and validate the requestId
    const parsedRequestId = parseInt(requestId, 10);
    if (isNaN(parsedRequestId)) {
      throw new BadRequestException('Invalid requestId. It must be a numeric value.');
    }

    // Step 2: Find the message request by ID
    const messageRequest = await this.messageRequestRepository.findOne({
      where: { id: parsedRequestId },
    });

    if (!messageRequest) {
      throw new NotFoundException('Message request not found.');
    }

    // Step 3: Validate the new status
    const { statut } = updateStatusDto;
    if (!Object.values(StatutMessageRequest).includes(statut)) {
      throw new BadRequestException(
        `Invalid status. Allowed values are: ${Object.values(StatutMessageRequest).join(', ')}.`,
      );
    }

    // Step 4: Update the status
    messageRequest.statut = statut;
    const updatedRequest = await this.messageRequestRepository.save(messageRequest);
  
    // Notify the doctor and patient of status change
    this.gateway.server.to(`doctor_${messageRequest.doctorId}`).emit('requestStatusUpdated', updatedRequest);
    this.gateway.server.to(`patient_${messageRequest.patientId}`).emit('requestStatusUpdated', updatedRequest);
  
    // If approved, create a conversation
    if (statut === StatutMessageRequest.ACCEPTE) {
      const conversationDto: ConversationDto = {
        patientId: messageRequest.patientId,
        doctorId: messageRequest.doctorId,
        dateDebut: new Date(),
        messages: [],
      };
      const conversation = await this.createOrFetchConversation(conversationDto);
  
      // Notify the participants of the new conversation
      this.gateway.notifyNewConversation(conversation.id);
    }
  
    return updatedRequest;
  }
  //-----------------------------------------------------------------------------------------
  // Create or Fetch Conversation
  async createOrFetchConversation(conversationDto: ConversationDto): Promise<ConversationEntity> {
    const { patientId, doctorId } = conversationDto;
  
    // Check if a conversation already exists
    let conversation = await this.conversationRepository.findOne({
      where: { patientId, doctorId },
      relations: ['messages'], // Fetch associated messages
    });
  
    if (!conversation) {
      // Create a new conversation if none exists
      conversation = this.conversationRepository.create({
        patientId,
        doctorId,
        dateDebut: new Date(),
      });
  
      conversation = await this.conversationRepository.save(conversation);
    }
    return conversation;
  }  
  //-----------------------------------------------------------------------------------------
  // Send Messages
  async sendMessage(messageDto: MessageDto): Promise<MessageEntity> {
    const { conversationId, expediteurId, expediteurType, contenu, dateEnvoi, seen, pieceJointe } = messageDto;
  
    // Fetch the conversation to ensure it exists
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
    });
  
    if (!conversation) {
      throw new NotFoundException('Conversation not found.');
    }
  
    // Create and save the message
    const message = this.messageRepository.create({
      conversation,
      expediteurId,
      expediteurType,
      contenu,
      dateEnvoi: new Date(dateEnvoi),
      seen,
      pieceJointe,
    });
  
    return await this.messageRepository.save(message);
  }  
  //-----------------------------------------------------------------------------------------
  // Fetch Messages for a Conversation
  async getMessages(conversationId: string): Promise<MessageEntity[]> {
    const parsedConversationId = parseInt(conversationId, 10);
  
    if (isNaN(parsedConversationId)) {
      throw new BadRequestException('Invalid conversationId. It must be a numeric value.');
    }
  
    const messages = await this.messageRepository.find({
      where: { conversation: { id: parsedConversationId } },
      order: { dateEnvoi: 'ASC' }, // Sort messages by send date
    });
  
    if (!messages.length) {
      throw new NotFoundException('No messages found for this conversation.');
    }
  
    return messages;
  }
  //-----------------------------------------------------------------------------------------
  // Mark Messages as Seen
  async markMessageAsSeen(messageId: string): Promise<MessageEntity> {
    const parsedMessageId = parseInt(messageId, 10);
  
    if (isNaN(parsedMessageId)) {
      throw new BadRequestException('Invalid messageId. It must be a numeric value.');
    }
  
    const message = await this.messageRepository.findOne({
      where: { id: parsedMessageId },
    });
  
    if (!message) {
      throw new NotFoundException('Message not found.');
    }
  
    message.seen = true;
    return await this.messageRepository.save(message);
  }
  //-----------------------------------------------------------------------------------------
  // 
}