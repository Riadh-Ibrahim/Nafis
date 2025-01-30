import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Confirm your Email',
        template: './confirmation',
        context: {
          token,
        },
        text: `Use this token to confirm your email: ${token}`,
      });
    //   console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }
}
