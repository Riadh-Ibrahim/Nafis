import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRequestEntity } from './entities/message-request.entity';
import { ConversationEntity } from './entities/conversation.entity';
import { MessageEntity } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRequestEntity, ConversationEntity, MessageEntity])],
  controllers: [MessagingController],
  providers: [MessagingService]
})
export class MessagingModule {}