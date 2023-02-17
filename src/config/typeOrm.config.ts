import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { createUser1676603367056 } from '../database/migrations/1676603367056-createUser';
import { createProfile1676603715400 } from '../database/migrations/1676603715400-createProfile';
import { createPost1676604774291 } from '../database/migrations/1676604774291-createPost';
import { createCommunity1676604842201 } from '../database/migrations/1676604842201-createCommunity';
import { Community } from '../modules/communities/entities/community.entity';
import { Post } from '../modules/posts/entities/post.entity';
import { Profile } from '../modules/profiles/entities/profile.entity';
import { User } from '../modules/users/entities/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  port: 5432,
  username: configService.get('USER'),
  password: configService.get('PASSWORD'),
  database: configService.get('DATABASE'),
  entities: [User, Profile, Post, Community],
  migrations: [
    createUser1676603367056,
    createProfile1676603715400,
    createPost1676604774291,
    createCommunity1676604842201,
  ],
});
