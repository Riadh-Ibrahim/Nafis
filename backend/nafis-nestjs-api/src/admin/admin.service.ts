/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(userId: number): Promise<Admin> {
     try {
          const newAdmin=this.adminRepository.create({
             user: {id: userId}
          });
          const adminEntity =  await this.adminRepository.save(newAdmin);
          return adminEntity;
    
        } catch (error) {
          console.log(error);
          throw new ConflictException("Cannot create admin");
        }
    
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    return this.adminRepository.findOne({ where: { id } });
  }


  async findAppropriateAdminForPersonnel(): Promise<Admin> {
    
    const admin = await this.adminRepository
        .createQueryBuilder('admin')
        .leftJoinAndSelect('admin.user', 'user')
        .leftJoinAndSelect('admin.personnel', 'personnel')
        .groupBy('admin.id')
        .addGroupBy('user.id')
        .addGroupBy('personnel.id')
        .having('COUNT(personnel.id) < 10') 
        .orderBy('user.createdAt', 'ASC')
        .getOne();
      return admin;
  }


  async findAppropriateAdminForPatient(): Promise<Admin> {
    
    const admin = await this.adminRepository
        .createQueryBuilder('admin')
        .leftJoinAndSelect('admin.user', 'user')
        .leftJoinAndSelect('admin.patients', 'patient')
        .groupBy('admin.id')
        .addGroupBy('user.id')
        .addGroupBy('patient.id')
        .having('COUNT(patient.id) < 10') 
        .orderBy('user.createdAt', 'ASC')
        .getOne();
      return admin;
  }
}
