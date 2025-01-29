import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Admin,User]),
    forwardRef(() => UserModule)
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
