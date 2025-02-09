import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(email: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to Nafis HealthCare!',
        template: './welcome',
        context: {
          email,
        },
        text: `Welcome to Nafis HealthCare! We're glad to have you on board.`,
      });
      console.log('Welcome email sent successfully');
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }
  }
}
