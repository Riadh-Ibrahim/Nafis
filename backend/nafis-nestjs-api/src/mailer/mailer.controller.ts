import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mailer.service';

@Controller('user')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
  async sendEmail(@Body('email') email: string) {
    await this.mailService.sendWelcomeEmail(email);

    return { message: 'Email sent successfully!' };
  }
}
