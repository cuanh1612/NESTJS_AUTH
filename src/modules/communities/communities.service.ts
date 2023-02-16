import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AssignUserDto } from './dto/assign-user.dto';
import { CreateCommunityDto } from './dto/create-community.dto';
import { RemoveAssignUserDto } from './dto/remove-assign-user.dto';
import { Community } from './entities/community.entity';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createCommunityDto: CreateCommunityDto) {
    const newCommunity = this.communityRepository.create({
      ...createCommunityDto,
    });
    return this.communityRepository.save(newCommunity);
  }

  findAll() {
    return this.communityRepository.find({
      relations: {
        users: true,
      },
    });
  }

  findOne(id: number) {
    return this.communityRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.communityRepository.delete({ id });
  }

  async assignUser(dataAssign: AssignUserDto) {
    const user = await this.userRepository.findOneBy({ id: dataAssign.userId });
    const community = await this.communityRepository.findOne({
      where: {
        id: dataAssign.communityId,
      },
      relations: {
        users: true,
      },
    });

    if (!user || !community) {
      throw new HttpException(
        'User or community not found.',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Check exist user in community and assign
    if (!community.users.includes(user)) {
      community.users = [...community.users, user];
      await this.communityRepository.save(community);
    }

    return 'Assign user success';
  }

  async removeAssign(dataRemoveAssignUser: RemoveAssignUserDto) {
    const user = await this.userRepository.findOneBy({
      id: dataRemoveAssignUser.userId,
    });
    const community = await this.communityRepository.findOne({
      where: {
        id: dataRemoveAssignUser.communityId,
      },
      relations: {
        users: true,
      },
    });

    if (!user || !community) {
      throw new HttpException(
        'User or community not found.',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Remove user in community
    if (community.users) {
      community.users = community.users.filter(
        (userItem) => userItem.id !== user.id,
      );

      await this.communityRepository.save(community);
    }

    return 'Remove user out of community success';
  }
}
