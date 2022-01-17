import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../common/base.resolver';
import { UserCreateInput } from './input/user.create.input';
import { UserUpdateInput } from './input/user.update.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver extends BaseResolver({
  entity: {
    single: User,
  },
  resolver: {
    single: {},
    list: {},
    delete: {},
    create: {
      ref: UserCreateInput,
    },
    update: {
      ref: UserUpdateInput,
    },
  },
}) {
  constructor(private userService: UserService) {
    super(userService);
  }
}
