/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  
  constructor(
    @InjectRepository(User)
    private readonly userReposiotry: Repository<User>,
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
    this.logger.error('Signup method called with DTO:', newUser);

    const hashedPassword = await this.hashPassword(newUser.password);
    newUser.password = hashedPassword;

    console.log("signup password is ", newUser.password)

    const user = this.userReposiotry.create(
      newUser
    );

    console.log('user enitty is created');

    try {
      this.userReposiotry.save(user);
      console.log('created user password', user.password)
      console.log("user saved")
    }

    catch (e) {
      console.log(e)
      throw new ConflictException(e);
    }

    const token = this.jwtService.sign({id: user.id, role: user.role});
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    
    const user = await this.userReposiotry.findOne({
      where: { email},
    });

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
