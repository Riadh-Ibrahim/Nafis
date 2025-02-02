import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagingService } from './messaging.service';
import { MessageDto } from './dto/message.dto';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class MessagingGateway {
  @WebSocketServer()
  server: Server;

  constructor(@Inject(forwardRef(() => MessagingService)) private readonly messagingService: MessagingService) {}

  // Notify the doctor of a new request
  async notifyNewRequest(doctorId: number, request: any) {
    this.server.to(`doctor_${doctorId}`).emit('newRequest', request);
  }

  // Notify participants of a new conversation
  async notifyNewConversation(conversationId: number, patientId: number, doctorId: number) {
    // Notify the doctor and the patient of the new conversation
    this.server.to(`doctor_${doctorId}`).emit('newConversation', { conversationId, patientId, doctorId });
    this.server.to(`patient_${patientId}`).emit('newConversation', { conversationId, patientId, doctorId });
  }

  // Send messages
  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() messageDto: MessageDto) {
    const message = await this.messagingService.sendMessage(messageDto);

    // Broadcast the message to participants in the conversation room
    this.server.to(`conversation_${messageDto.conversationId}`).emit('newMessage', message);

    return message;
  }

  @SubscribeMessage('joinConversation')
  handleJoinConversation(@MessageBody() conversationId: number, @ConnectedSocket() client: Socket) {
    const room = `conversation_${conversationId}`;
    client.join(room);  // Join the conversation room
  }
}  