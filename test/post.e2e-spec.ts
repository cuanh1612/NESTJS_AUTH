import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/modules/users/entities/user.entity';
import * as request from 'supertest';
import { Post } from '../src/modules/posts/entities/post.entity';
import { PostsModule } from '../src/modules/posts/posts.module';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
    findOneBy: jest.fn().mockImplementation((id) => ({
      id,
      userName: 'Test user name',
      role: 'user',
    })),
  };
  const mockPostRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((post) =>
      Promise.resolve({
        id: Date.now(),
        description: post.description,
        title: post.title,
      }),
    ),
    find: jest.fn().mockImplementation(() => Promise.resolve([])),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostsModule],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .then((data) => {
        expect(data).toBeDefined();
      });
  });
});
