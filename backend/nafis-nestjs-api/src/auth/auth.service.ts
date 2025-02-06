/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { PatientsService } from 'src/patients/patients.service';
import { AdminService } from 'src/admin/admin.service';
import { UserService } from 'src/user/user.service';
import { PersonnelsService } from 'src/personnels/personnels.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  
  constructor(
    private readonly userService: UserService,
    private readonly patientService: PatientsService,
    private readonly adminService: AdminService,
    private readonly personnelService: PersonnelsService,
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
    const { commonFields, personnelSpecificFields } = newUser;

    const existingUser = await this.userService.findByEmail(commonFields.email);
    if (existingUser) {
      throw new ConflictException("Email is already in use");
    }

    commonFields.password = await this.hashPassword(commonFields.password);

    console.log("signup password is ", commonFields.password)

    const userEntity = await this.userService.add(commonFields);

    if (commonFields.role == UserRoleEnum.ADMIN) {
      
      try {
        await this.adminService.create(userEntity.id);
        console.log('admin enitty is created');
      
      }
  
      catch (e) {
        console.log(e)
        throw new ConflictException(e);
      }
  

    }

    else if (commonFields.role == UserRoleEnum.PATIENT) {
      const admin = await this.adminService.findAppropriateAdminForPatient();

      if (!admin) {
        throw new ConflictException("No admin was found");
      }

      
      try {
        await this.patientService.create(admin.id, userEntity.id);
        
      }
  
      catch (e) {
        console.log(e)
        throw new ConflictException(e);
      }
  
    }

    else if (commonFields.role == UserRoleEnum.PERSONNEL) {
      if (!personnelSpecificFields) {
        throw new ConflictException('Personnel specific fields are required for personnel registration');
      }

      try {
        const admin = await this.adminService.findAppropriateAdminForPersonnel();
        await this.personnelService.create(
          admin.id,
          userEntity.id,
          personnelSpecificFields
        );
      }

      catch (e) {
        console.log(e)
        throw new ConflictException(e);
      }


    }



    const token = this.jwtService.sign({id: userEntity.id, role: userEntity.role});
    console.log(`signup token ${token}`)
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
