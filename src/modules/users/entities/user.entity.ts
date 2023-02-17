import { Post } from '../../posts/entities/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Community } from '../../communities/entities/community.entity';

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

  @OneToOne(() => Profile, (profile) => profile.id)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => Community, (community) => community.users)
  communities: Community[];
}
