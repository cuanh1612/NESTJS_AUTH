import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/databaseEnv.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CommunitiesModule } from './modules/communities/communities.module';
import { Community } from './modules/communities/entities/community.entity';
import { Post } from './modules/posts/entities/post.entity';
import { PostsModule } from './modules/posts/posts.module';
import { Profile } from './modules/profiles/entities/profile.entity';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { ReportService } from './scheduling/report.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        USER: Joi.string().required(),
        PASSWORD: Joi.string().required(),
        DATABASE: Joi.string().required(),
      }),
      load: [databaseConfig],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          port: 5432,
          database: configService.get('database.database'),
          password: configService.get('database.password'),
          username: configService.get('database.username'),
          entities: [User, Profile, Post, Community],
          logging: true,
          synchronize: false,
        };
      },
    }),
    UsersModule,
    ProfilesModule,
    PostsModule,
    AuthenticationModule,
    CommunitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ReportService],
})
export class AppModule {}
