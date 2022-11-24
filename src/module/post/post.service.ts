import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiConfigService } from 'src/config/api-config.service';
import { UserService } from '../user';
import { Repository } from 'typeorm';
import { Posts } from '../../database/entities';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class PostService {
  constructor(
    private readonly configService: ApiConfigService,
    private readonly userService: UserService,
    @InjectRepository(Posts)
    private readonly postRepos: Repository<Posts>
  ) {}

  async createPost(userId: number, data: CreatePostDto) {
    const user = await this.userService.getUser({id: userId})

    const payload = {
      ...data,
      userId: user.id
    }

    const result = await this.postRepos.save(payload);

    return result;
  }
  
}
