import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from './entities/post.entity';
import { CreatePostParams, UpdatePostParams } from './utils/types';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userId: number, createPostDetails: CreatePostParams) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPost = this.postRepository.create({ ...createPostDetails, user });
    return this.postRepository.save(newPost);
  }

  updatePost(id: number, updatePostDetails: UpdatePostParams) {
    return this.postRepository.update({ id }, { ...updatePostDetails });
  }

  deletePost(id: number) {
    return this.postRepository.delete({ id });
  }

  getAllPost() {
    return this.postRepository.find();
  }
}
