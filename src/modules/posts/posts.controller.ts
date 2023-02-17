import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import JwtAuthenticationGuard from 'src/common/guards/jwt-authentication.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':userId')
  @UseGuards(JwtAuthenticationGuard)
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(userId, createPostDto);
  }
}
