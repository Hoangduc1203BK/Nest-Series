import { CreateUserDto, ListUserDto, UpdateUserDto } from './dto';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from 'src/config/api-config.service';
import { v4 as uuidv4 } from 'uuid';
import { GetUserDto } from './dto/get-user.dto';
import { DynamoDBConfig } from '../../database/database.config';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DEFAULT_PAGING } from '../../const/const';
import { TABLENAME } from '../../const/table';
import { Categories } from 'src/database/schemas/categories.schema';
@Injectable()
export class UserService {
  private db: DocumentClient;
  constructor(private readonly configService: ApiConfigService, private readonly dynamodbConfig: DynamoDBConfig) {
    this.db = dynamodbConfig.getInstance();
  }

  async getUser(payload: GetUserDto) {
    const result = await this.db
      .get({
        TableName: TABLENAME.USERS,
        Key: {
          ...payload,
        },
      })
      .promise();

    if (!result.Item) {
      throw new Error('User not found');
    }

    return result.Item;
  }

  async createUser(payload: CreateUserDto) {
    const doc = {
      Item: {
        id: uuidv4(),
        ...payload,
        ctime: Date.now(),
        mtime: Date.now(),
      },
      TableName: TABLENAME.USERS,
    };

    const result = await this.db.put(doc).promise();

    return result;
  }
  async listUser(query: ListUserDto) {
    const { page = DEFAULT_PAGING.PAGE, limit = DEFAULT_PAGING.LIMIT } = query;
    const skip = (page - 1) * limit;

    const params = {
      TableName: TABLENAME.USERS,
      Limit: limit,
    };
    const users = await this.db.scan(params).promise();

    return users.Items;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await this.getUser({ id });

    if(!user) {
      throw new Error('User not found');
    }

    const doc = {
      ...user,
      mtime: Date.now()
    }

    const params = {
      Item: doc,
      Key: { id },
      UpdateExpression:'set age = 30',
      TableName: TABLENAME.USERS,
    }
    const result = await this.db.update(params).promise()

    return result;
  }
}
