import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { v4 as uuidv4 } from 'uuid';
import { ApiConfigService } from 'src/config/api-config.service';
import { DocumentClient } from 'dynamodb/DynamoDB';
import { DynamoDBConfig } from '../../database/database.config';
import { UserService } from '../user';
import { TABLENAME } from 'src/const/table';
@Injectable()
export class PostService {
  private db: DocumentClient;
  constructor(
    private readonly configService: ApiConfigService,
    private readonly dynamodbConfig: DynamoDBConfig,
    private readonly userService: UserService,
  ) {
    this.db = dynamodbConfig.getInstance();
  }

  async createPost(email: string, data: CreatePostDto) {
    const user = await this.userService.getUser({email})

    if(!user) {
      throw new Error('User not found')
    }
    
    const doc = {
      id: uuidv4(),
      ...data,
      ctime: Date.now(),
      mtime: Date.now(),
    };

    const params = {
      Item: {
        ...doc
      },
      ReturnValues: 'ALL_NEW',
      TableName: TABLENAME.POSTS,
    }   

    const result = await this.db.put(params);

    return result;
  }
}
