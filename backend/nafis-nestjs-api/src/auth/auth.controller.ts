/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}
    @Post('signup')
    async signup(@Body() newUser: SignupDto) {
        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        try {
            console.log("dto is valid")
           return await this.authService.signup(newUser);
            
          } catch (e) {
            console.log(e)
            throw new HttpException('User creation failed', HttpStatus.BAD_REQUEST); 
          }
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }
}
