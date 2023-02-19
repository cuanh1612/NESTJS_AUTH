import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import JwtAuthenticationGuard from 'src/common/guards/jwt-authentication.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':userId')
  @UseGuards(JwtAuthenticationGuard)
  getAll() {
    return this.postsService.getAllPost();
  }

  @Post(':userId')
  @UseGuards(JwtAuthenticationGuard)
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(userId, createPostDto);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthenticationGuard)
  delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.postsService.deletePost(userId);
  }

  @Patch(':userId')
  @UseGuards(JwtAuthenticationGuard)
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(userId, updatePostDto);
  }
}
