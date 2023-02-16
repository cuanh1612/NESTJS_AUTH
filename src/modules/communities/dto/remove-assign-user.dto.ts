import { IsInt } from 'class-validator';

export class RemoveAssignUserDto {
  @IsInt()
  userId: number;
  @IsInt()
  communityId: number;
}
