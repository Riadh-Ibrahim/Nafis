import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mailer.service';

@Controller('user')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
  async sendEmail(@Body('email') email: string) {
    const token = Math.random().toString(36).substring(7);
    await this.mailService.sendUserConfirmation(email, token);
    return { message: 'Email sent successfully!' };
  }
}
