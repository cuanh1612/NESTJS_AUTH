import { Injectable } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  SchedulerRegistry,
  Timeout,
} from '@nestjs/schedule';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly usersService: UsersService,
    private scheduleRegistry: SchedulerRegistry,
  ) {}
  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'report',
  })
  triggerNotifications() {
    console.log('Trigger notification every 10 second');
  }

  @Timeout(30000)
  async stopTriggerCronJob() {
    const job = this.scheduleRegistry.getCronJob('report');
    job.stop();
    console.log(`Stop trigger at ${job.lastDate()}`);
  }
}
