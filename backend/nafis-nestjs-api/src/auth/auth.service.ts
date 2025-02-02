/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { User } from 'src/user/entities/user.entity';
import { PatientsService } from 'src/patients/patients.service';
import { AdminService } from 'src/admin/admin.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  
  constructor(
    private readonly userService: UserService,
    private readonly patientService: PatientsService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {};

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(password: string, hashPassword: string): Promise<boolean> {
    console.log('Received password:', password);
    console.log('Stored hashed password:', hashPassword);
    return await bcrypt.compare(password, hashPassword); 
  }

  async signup(newUser: SignupDto) {
    this.logger.log('Signup method called with DTO:', newUser);

    const existingUser = await this.userService.findByEmail(newUser.email);
    if (existingUser) {
      throw new ConflictException("Email is already in use");
    }

    newUser.password = await this.hashPassword(newUser.password);

    console.log("signup password is ", newUser.password)

    const user = await this.userService.add(newUser);
    const userEntity = await this.userService.save(user);

    if (newUser.role == UserRoleEnum.ADMIN) {
      
      try {
        await this.adminService.create(userEntity.id, {firstname:'',lastname:'',email:'',password:'',role:UserRoleEnum.VIDE});
        console.log('admin enitty is created');
      
      }
  
      catch (e) {
        console.log(e)
        throw new ConflictException(e);
      }
  

    }

    else if (newUser.role == UserRoleEnum.PATIENT) {
      const admin = await this.adminService.findAppropriateAdmin();

      if (!admin) {
        throw new ConflictException("No admin was found");
      }

      
      try {
        await this.patientService.create({ Admin: { id: admin.id },nom:'',prenom:'',numeroSecu:'',dateNaissance: new Date('2025-08-08') });
        
      }
  
      catch (e) {
        console.log(e)
        throw new ConflictException(e);
      }
  
    }



    const token = this.jwtService.sign({id: user.id, role: user.role});
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("invalid email");
    }

    console.log(user)

    const isPasswordMatched = await this.comparePasswords(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException("invalid password");
    }

    const token = this.jwtService.sign({id: user.id, email: user.email, role: user.role});
    console.log("login token is", { token })
    return { token }
  }
}
