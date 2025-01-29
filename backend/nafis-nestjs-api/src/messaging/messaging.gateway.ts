import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
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
    async notifyNewConversation(conversationId: number) {
      this.server.to(`conversation_${conversationId}`).emit('conversationCreated');
    }
  
    @SubscribeMessage('sendMessage')
    async handleSendMessage(@MessageBody() messageDto: MessageDto) {
      const message = await this.messagingService.sendMessage(messageDto);
  
      // Broadcast the message to participants
      this.server.to(`conversation_${messageDto.conversationId}`).emit('newMessage', message);
  
      return message;
    }
  
    @SubscribeMessage('joinConversation')
    handleJoinConversation(@MessageBody() conversationId: number) {
      const room = `conversation_${conversationId}`;
      this.server.socketsJoin(room);
    }
  }  