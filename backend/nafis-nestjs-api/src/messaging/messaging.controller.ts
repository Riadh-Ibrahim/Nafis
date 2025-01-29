import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { ConversationDto } from './dto/conversation.dto';
import { MessageDto } from './dto/message.dto';
import { CreateMessageRequestDto } from './dto/create-message-request.dto';
import { UpdateMessageStatusDto } from './dto/update-message-request.dto';

@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post('request')
  createRequest(@Body() createRequestDto: CreateMessageRequestDto) {
    return this.messagingService.createRequest(createRequestDto);
  }

  @Get('requests/:doctorId')
  getRequests(@Param('doctorId') doctorId: string) {
    return this.messagingService.getRequests(doctorId);
  }

  @Put('requests/:requestId/status')
  updateRequestStatus(
    @Param('requestId') requestId: string,
    @Body() updateStatusDto: UpdateMessageStatusDto,
  ) {
    return this.messagingService.updateRequestStatus(requestId, updateStatusDto);
  }

  @Post('conversations')
  createOrFetchConversation(@Body() conversationDto: ConversationDto) {
    return this.messagingService.createOrFetchConversation(conversationDto);
  }

  @Post('messages')
  sendMessage(@Body() messageDto: MessageDto) {
    return this.messagingService.sendMessage(messageDto);
  }

  @Get('conversations/:conversationId/messages')
  getMessages(@Param('conversationId') conversationId: string) {
    return this.messagingService.getMessages(conversationId);
  }

  @Put('messages/:messageId/seen')
  markMessageAsSeen(@Param('messageId') messageId: string) {
    return this.messagingService.markMessageAsSeen(messageId);
  }
}