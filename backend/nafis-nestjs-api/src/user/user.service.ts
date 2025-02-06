import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SignupDto } from "src/auth/dto/signup.dto";
import { AdminService } from "src/admin/admin.service"; // Import AdminService
import { UserRoleEnum } from "src/enums/user-role.enum";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly adminService: AdminService // Inject AdminService
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
