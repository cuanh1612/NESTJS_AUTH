import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ExceptionFilterCommon } from './filters/exceptionFilter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new ExceptionFilterCommon());

  const configService = app.get(ConfigService);
  await app.listen(+configService.get('PORT'), () => {
    console.log(`App run on  http://localhost:${configService.get('PORT')}`);
  });
}
bootstrap();
