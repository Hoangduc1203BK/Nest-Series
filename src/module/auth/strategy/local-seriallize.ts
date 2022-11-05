import { User } from '../../../database/entities';
import { UserService } from '../../user/user.service';
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly userService: UserService,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: number, done: CallableFunction) {
    const user = await this.userService.getUserById(userId)
    done(null, user);
  }
}