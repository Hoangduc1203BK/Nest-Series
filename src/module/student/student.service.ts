import { Injectable } from "@nestjs/common";
import { ApiConfigService } from "src/config/api-config.service";
import * as AWS from 'aws-sdk';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
@Injectable()
export class StudentService {
    constructor(
        private readonly configService: ApiConfigService
    ) {}


    async getStudent() {
        AWS.config.update(this.configService.getDynamoConfig())

        const docClient = new DocumentClient();

        const result = await docClient.scan({
            TableName: 'student'
        }).promise()

        return result;
    }

}