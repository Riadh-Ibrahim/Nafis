/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(userId: number, newAdminData: CreateAdminDto): Promise<Admin> {
     try {
          const newAdmin=this.adminRepository.create({
             ...newAdminData,
             user: {id: userId}
          });
          const adminEntity =  await this.adminRepository.save(newAdmin);
          return adminEntity;
    
        } catch (error) {
          console.log(error);
          throw new ConflictException("Cannot create patient");
        }
    
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    return this.adminRepository.findOne({ where: { id } });
  }

  async findAppropriateAdmin(): Promise<Admin> {
    const admin = await this.adminRepository
        .createQueryBuilder('admin')
        .leftJoinAndSelect('admin.patients', 'patient')
        .having('COUNT(patient.id) < 10') 
        .orderBy('admin.createdAt', 'ASC')
        .getOne();
      return admin;
  }
}
