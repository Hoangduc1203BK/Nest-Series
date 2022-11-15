import { Injectable } from "@nestjs/common";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ApiConfigService } from "../config/api-config.service";
import * as AWS from 'aws-sdk';
@Injectable()
export class DynamoDBConfig {
private db: DocumentClient;
constructor(private readonly configService: ApiConfigService) {}

getInstance() {
    if(this.db) {
        return this.db;
    }
    AWS.config.update(this.configService.getDynamoConfig());
    this.db = new AWS.DynamoDB.DocumentClient();

    return this.db;
}

}
