import { Community } from 'src/modules/communities/entities/community.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Profile } from 'src/modules/profiles/entities/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: string;

  @Column()
  createAt: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => Community, (community) => community.users)
  communities: Community[];
}
