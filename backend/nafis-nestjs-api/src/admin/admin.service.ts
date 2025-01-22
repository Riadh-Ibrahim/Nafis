import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    const admin = this.adminRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    });
    return this.adminRepository.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    return this.adminRepository.findOne({ where: { id } });
  }
}
