import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportService } from './common/scheduling/report.service';
import { configModuleOptions } from './config/moduleOptions.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CommunitiesModule } from './modules/communities/communities.module';
import { Community } from './modules/communities/entities/community.entity';
import { Post } from './modules/posts/entities/post.entity';
import { PostsModule } from './modules/posts/posts.module';
import { Profile } from './modules/profiles/entities/profile.entity';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { MessageProducerService } from './modules/message_producer/message_producer.service';
import { MessageConsumer } from './common/consumers/message.consumer';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number(configService.get('REDIS_PORT')),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          port: configService.get('database.port'),
          database: configService.get('database.database'),
          password: configService.get('database.password'),
          username: configService.get('database.username'),
          entities: [User, Profile, Post, Community],
          logging: true,
          synchronize: false,
        };
      },
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    ProfilesModule,
    PostsModule,
    AuthenticationModule,
    CommunitiesModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ReportService,
    MessageProducerService,
    MessageConsumer,
  ],
})
export class AppModule {}
