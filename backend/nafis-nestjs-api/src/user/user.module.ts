import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PatientsModule } from 'src/patients/patients.module';
import { AdminModule } from 'src/admin/admin.module';
import { forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Admin]),
    forwardRef(() => PatientsModule),
    forwardRef(() => AdminModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
