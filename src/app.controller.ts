import { Controller, Query, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageProducerService } from './modules/message_producer/message_producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly messageProducerService: MessageProducerService,
  ) {}

  @Get('invoke-msg')
  getInvokeMsg(@Query('msg') msg: string) {
    this.messageProducerService.sendMessage(msg);
  }
}
