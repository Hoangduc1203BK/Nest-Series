import { Injectable } from '@nestjs/common';
import { InjectModel, Model, TransactionSupport } from 'nestjs-dynamoose';
import { Posts, PostKey } from './interface/post.interface';
import { UserService } from '../user';
import { v4 as uuidv4 } from 'uuid';
import { UserKey } from '../user/interface/user.interface';
import { User } from '../../database/schema';
import { CreatePostDto } from './dto';
@Injectable()
export class PostService extends TransactionSupport {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Posts, PostKey>,
    private readonly userService: UserService,
  ) {
    super();
  }

  async createPost(email: string, data: CreatePostDto) {
    const user = await this.userService.getUser({ email })
    const doc = {
      id: uuidv4(),
      user_id: user.id,
      ...data,
    }

    const result = await this.postModel.create(doc);
    return result;
  }

  async listPost(email: string) {
    const user = await this.userService.getUser({ email });
    
    const result = await this.postModel.scan({ user_id: user.id}).exec();

    return result;
  }
}
