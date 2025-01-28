// import {
//     WebSocketGateway,
//     WebSocketServer,
//     SubscribeMessage,
//     OnGatewayInit,
//     OnGatewayConnection,
//     OnGatewayDisconnect,
//   } from '@nestjs/websockets';
//   import { Server, Socket } from 'socket.io';
//   import { Injectable, Logger } from '@nestjs/common';
//   import { MessagingService } from './messaging.service';
  
//   @WebSocketGateway({ namespace: '/messaging', cors: true }) // Use a namespace and configure CORS if needed
//   @Injectable()
//   export class MessagingGateway
//     implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
//   {
//     @WebSocketServer()
//     server: Server;
  
//     private logger = new Logger('MessagingGateway');
  
//     constructor(private readonly messagingService: MessagingService) {}
  
//     // Triggered when the gateway initializes
//     afterInit(server: Server) {
//       this.logger.log('WebSocket Gateway Initialized');
//     }
  
//     // Triggered when a client connects
//     handleConnection(client: Socket) {
//       this.logger.log(`Client connected: ${client.id}`);
//     }
  
//     // Triggered when a client disconnects
//     handleDisconnect(client: Socket) {
//       this.logger.log(`Client disconnected: ${client.id}`);
//     }
  
//     // Listen for a "sendMessage" event
//     @SubscribeMessage('sendMessage')
//     async handleSendMessage(client: Socket, payload: any) {
//       const { conversationId, expediteurId, expediteurType, contenu } = payload;
  
//       // Save the message to the database using the service
//       const message = await this.messagingService.saveMessage({
//         conversationId,
//         expediteurId,
//         expediteurType,
//         contenu,
//         dateEnvoi: new Date(),
//         seen: false,
//         pieceJointe: payload.pieceJointe || null,
//       });
  
//       // Emit the new message to the participants of the conversation
//       this.server.to(`conversation-${conversationId}`).emit('newMessage', message);
  
//       return message;
//     }
  
//     // Listen for a "joinConversation" event
//     @SubscribeMessage('joinConversation')
//     handleJoinConversation(client: Socket, payload: { conversationId: number }) {
//       const { conversationId } = payload;
//       client.join(`conversation-${conversationId}`);
//       this.logger.log(`Client ${client.id} joined conversation-${conversationId}`);
//     }
  
//     // Notify doctors of new requests
//     async notifyNewRequest(doctorId: number, request: any) {
//       this.server.to(`doctor-${doctorId}`).emit('newRequest', request);
//     }
//   }
  