import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import JwtAuthenticationGuard from 'src/common/guards/jwt-authentication.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CommunitiesService } from './communities.service';
import { AssignUserDto } from './dto/assign-user.dto';
import { CreateCommunityDto } from './dto/create-community.dto';
import { RemoveAssignUserDto } from './dto/remove-assign-user.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communitiesService.create(createCommunityDto);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  findAll() {
    return this.communitiesService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.communitiesService.findOne(+id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.communitiesService.remove(+id);
  }

  @Post('assign-user')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  assignUser(@Body() asignUserDto: AssignUserDto) {
    return this.communitiesService.assignUser(asignUserDto);
  }

  @Post('remove-assign')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  removeAssign(@Body() removeAssignUserDto: RemoveAssignUserDto) {
    return this.communitiesService.removeAssign(removeAssignUserDto);
  }
}
