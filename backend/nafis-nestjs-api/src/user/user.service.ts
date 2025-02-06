/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminService } from "src/admin/admin.service"; 

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly adminService: AdminService 
  ) {}

  async add(s: CreateUserDto) {
    const userEntity = this.userRepository.create(s);
    const savedUser = await this.userRepository.save(userEntity);
    return savedUser;
  }

  async save(s: User) {
    if (s) {
      return await this.userRepository.save(s);
    } else {
      throw new NotFoundException();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }
  async findAll() {
    return this.userRepository.find(); // This will return all users
  }

  
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
