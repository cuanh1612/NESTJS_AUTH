import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import JwtAuthenticationGuard from 'src/guards/jwt-authentication.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  getUsers() {
    return this.userService.findUsers();
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  createUser(@Body() CreateUserDto: CreateUserDto) {
    try {
      return this.userService.createUser(CreateUserDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
