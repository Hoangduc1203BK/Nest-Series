import { ListUserDto } from './dto';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from 'src/config/api-config.service';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { UserKey, User } from './interface/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_PAGING } from '../../const/const';
import { GetUserDto } from './dto/get-user.dto';
import { PostService } from '../posts';
import { PostKey, Posts } from '../posts/interface/post.interface';
@Injectable()
export class UserService {
  constructor(
    private readonly configService: ApiConfigService,
    @InjectModel('Users') private userModel: Model<User, UserKey>,
    @InjectModel('Users') private postModel: Model<Posts, PostKey>,
  ) {}

  async getUser(payload: GetUserDto) {
    const result = await this.userModel.scan(payload).exec();
    if (result.length===0) {
      throw new Error('User not found');
    }

    return result[0];
  }

  async createUser(payload: User): Promise<User> {
    const doc = {
      id: uuidv4(),
      ...payload,
    };
    const result = await this.userModel.create(doc);

    return result;
  }
  async listUser(query: ListUserDto) {
    console.log(1);
    const { page = DEFAULT_PAGING.PAGE, limit = DEFAULT_PAGING.LIMIT } = query;

    const skip = (page - 1) * limit;
    const users = await this.userModel.scan().limit(query.limit).exec();
    let result = [];
    for(let user of users) {
      const posts = await this.postModel.scan({id: user.id}).exec();
      console.log(posts);

      result.push({
        user,
        ...posts
      })
    }

    return result;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = await this.getUser({id});
    const result = await this.userModel.update({ id: user.id}, { ...data });

    return result;
  }
}
