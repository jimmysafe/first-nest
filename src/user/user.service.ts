import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/base.service';
import { UserCreateInput } from './input/user.create.input';
import { UserUpdateInput } from './input/user.update.input';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService<
  User,
  UserCreateInput,
  UserUpdateInput
> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(User, userRepository);
  }
}
