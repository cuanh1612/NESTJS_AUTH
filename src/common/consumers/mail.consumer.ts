import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import EmailScheduleDto from 'src/modules/email/dto/emailSchedule.dto';
import EmailService from 'src/modules/email/email.service';

@Processor('mail-queue')
export class MailConsumer {
  constructor(private readonly emailService: EmailService) {}
  @Process('send-mail')
  async sendMail(job: Job<unknown> & { data: EmailScheduleDto }) {
    await this.emailService.sendMail(job.data);
  }
}
