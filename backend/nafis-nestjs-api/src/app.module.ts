/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { MqttModule } from './mqtt/mqtt.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { DocumentsModule } from './documents/documents.module';
import { MessagingModule } from './messaging/messaging.module';
import { MessagingController } from './messaging/messaging.controller';
import { MessagingService } from './messaging/messaging.service';
import { MessageRequestEntity } from './messaging/entities/message-request.entity';
import { ConversationEntity } from './messaging/entities/conversation.entity';
import { MessageEntity } from './messaging/entities/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [User, MessageRequestEntity, ConversationEntity, MessageEntity],
      // logging: true,
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UserModule,
    MqttModule,
    MedicalHistoryModule,
    DocumentsModule,
    TypeOrmModule.forFeature([MessageRequestEntity, ConversationEntity, MessageEntity]),
    MessagingModule,

  ],
  controllers: [AppController, MessagingController],
  providers: [AppService, MessagingService],
})
export class AppModule {}
