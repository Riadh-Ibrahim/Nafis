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
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { Alerte } from './alerte/entities/alerte.entity';
import { Chambre } from './chambres/entities/chambre.entity';
import { ConstantesVitales } from './constantes-vitales/entities/constantes-vitale.entity';
import { Consultation } from './consultations/entities/consultation.entity';
import { Document } from './documents/entities/document.entity';
import { MedicalHistory } from './medical-history/entities/medical-history.entity';
import { Patient } from './patients/entities/patient.entity';
import { Personnel } from './personnels/entities/personnel.entity';
import { Presence } from './presences/entities/presence.entity';
import { RendezVous } from './rendez-vous/entities/rendez-vous.entity';
import { StatistiquesPresence } from './statistiques-presences/entities/statistiques-presence.entity';
import { ChambreLog } from './chambres/entities/chambre-log.entity';
import { ChambreHistorique } from './chambres/entities/chambre-historique.entity';
import { CongeDetail } from './statistiques-presences/entities/conge-detail.entity';
import { AbsenceDetail } from './statistiques-presences/entities/absence-detail.entity';
import { MissionDetail } from './statistiques-presences/entities/mission-detail.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      entities: [Admin,Alerte,Chambre,ConstantesVitales,Consultation,Document,MedicalHistory,Patient,Personnel,Presence,RendezVous,StatistiquesPresence,User,ChambreLog,ChambreHistorique,CongeDetail,AbsenceDetail,MissionDetail],
      logging: true,
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UserModule,
    MqttModule,
    MedicalHistoryModule,
    DocumentsModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
