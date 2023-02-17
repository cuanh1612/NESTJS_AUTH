import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/common/guards/jwt-authentication.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post(':userId')
  @UseGuards(JwtAuthenticationGuard)
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.profilesService.create(userId, createProfileDto);
  }
}
