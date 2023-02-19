import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';
import { Community } from './entities/community.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Community, User]), UsersModule],
  controllers: [CommunitiesController],
  providers: [CommunitiesService],
})
export class CommunitiesModule {}
