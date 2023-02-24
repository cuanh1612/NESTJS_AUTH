import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ReportService } from './common/scheduling/report.service';
import bullModuleConfig from './config/bullModule.config';
import { configModuleOptions } from './config/moduleOptions.config';
import typeOrmModuleAsyncOptions from './config/typeOrmModuleAsyncOptions.config';
import { GatewayModule } from './gateway/gateway.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CommunitiesModule } from './modules/communities/communities.module';
import { EmailModule } from './modules/email/email.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PostsModule } from './modules/posts/posts.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    BullModule.forRootAsync(bullModuleConfig),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    ScheduleModule.forRoot(),
    UsersModule,
    ProfilesModule,
    PostsModule,
    AuthenticationModule,
    CommunitiesModule,
    GatewayModule,
    EmailModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ReportService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
