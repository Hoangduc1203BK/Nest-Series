import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateUserDto, GetUserDto, ListUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepos: Repository<User>,
  ) {}

  async getUser(data: GetUserDto) {
    const user = await this.userRepos.findOne(data);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async getUserByAuth(data: GetUserDto) {
    const user = await this.userRepos.findOne(data);

    return user;
  }

  async listUser(data: ListUserDto) {}

  async createUser(data: CreateUserDto) {
    const user = await this.userRepos.save(data);

    return user;
  }

  async updateUser(id: number, data: any) {
    const user = await this.getUser({ id });

    return this.userRepos.update(user.id, data);
  }

  async deleteUser(id: string) {
    // await
  }
}
