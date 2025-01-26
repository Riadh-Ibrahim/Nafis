import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageRequestEntity, StatutMessageRequest } from './entities/message-request.entity';
import { ConversationEntity } from './entities/conversation.entity';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { UpdateMessageStatusDto } from './dto/update-message-request.dto';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(MessageRequestEntity)
    private readonly messageRequestRepository: Repository<MessageRequestEntity>,

    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,

    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
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

    // Step 3: Save the request to the database
    return await this.messageRequestRepository.save(newRequest);
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
    return await this.messageRequestRepository.save(messageRequest);
  }
}