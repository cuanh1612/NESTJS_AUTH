import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../../common/guards/jwt-authentication.guard';
import EmailScheduleDto from './dto/emailSchedule.dto';
import EmailSchedulingService from './emailScheduling.service';

@Controller('email-scheduling')
export default class EmailSchedulingController {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingService,
  ) {}

  @Post('schedule')
  @UseGuards(JwtAuthenticationGuard)
  async scheduleEmail(@Body() emailSchedule: EmailScheduleDto) {
    this.emailSchedulingService.scheduleEmail(emailSchedule);
  }
}
