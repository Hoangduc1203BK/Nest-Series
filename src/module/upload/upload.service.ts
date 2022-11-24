import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { File } from '../../database/entities';
import { S3 } from 'aws-sdk';
import { ApiConfigService } from '../../config/api-config.service';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepos: Repository<File>,
    private readonly configService: ApiConfigService,
  ) {}

  // async getAllFiles(userId: number) {
  //   const files = await this.fileRepos.find({ userId: userId });

  //   return files;
  // }

  // async uploadFile(userId: number, fileName: string, data: Buffer) {
  //   const s3 = new S3();
  //   const uploadResult = await s3
  //     .upload({
  //       Bucket: this.configService.getAWSConfig().bucketName,
  //       Body: data,
  //       Key: `${uuid()}-${fileName}`,
  //     })
  //     .promise();

  //   const newFile = this.fileRepos.save({
  //     userId: userId,
  //     key: uploadResult.Key,
  //     url: uploadResult.Location,
  //   });

  //   return newFile;
  // }

  // async generateUrl(key: string) {
  //   const s3 = new S3();
  //   const url = await s3.getSignedUrlPromise('getObject', {
  //     Bucket: this.configService.getAWSConfig().bucketName,
  //     Key: key,
  //   });

  //   return url;
  // }
}
