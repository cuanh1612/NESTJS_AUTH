import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post(':userId')
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profilesService.create(userId, createProfileDto);
  }
}
