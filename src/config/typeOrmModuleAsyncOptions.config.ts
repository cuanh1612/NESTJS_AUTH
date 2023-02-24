import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Community } from 'src/modules/communities/entities/community.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Profile } from 'src/modules/profiles/entities/profile.entity';
import { User } from 'src/modules/users/entities/user.entity';

const typeOrmModuleAsyncOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      port: configService.get('database.port'),
      database: configService.get('database.database'),
      password: configService.get('database.password'),
      username: configService.get('database.username'),
      entities: [User, Profile, Post, Community],
      logging: true,
      synchronize: false,
    };
  },
};

export default typeOrmModuleAsyncOptions;
