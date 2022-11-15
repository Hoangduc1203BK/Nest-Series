import { Injectable } from '@nestjs/common';
import { ApiConfigService } from 'src/config/api-config.service';
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
@Injectable()
export class StudentService {
  private db: DocumentClient;
  constructor(private readonly configService: ApiConfigService) {
    AWS.config.update(this.configService.getDynamoConfig());
    this.db = new AWS.DynamoDB.DocumentClient();
  }

  async getStudent() {
    const dynamodb = new AWS.DynamoDB();
    const result = await dynamodb.executeStatement({Statement: 'select * from User'}).promise()

    return result;
  }

  async createStudent() {
    const payload = {
      Item: {
        "id": "12",
        "usename":"vna",
        "age":30
      },
      TableName: 'student',
    };

    return new Promise((resolve, reject) => {
    this.db.put(payload, (err, data) => {
        if (err) {
          reject(err);
        } else {
            console.log(data);
          resolve(data);
        }
      });
    });
  }
}
