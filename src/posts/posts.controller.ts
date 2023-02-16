import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import JwtAuthenticationGuard from 'src/guards/jwt-authentication.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':userId')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(userId, createPostDto);
  }
}
