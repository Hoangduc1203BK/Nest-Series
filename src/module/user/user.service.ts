import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities';
import { FileService } from '../upload/upload.service';
import { UploadFileDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepos: Repository<User>,
        private readonly fileService: FileService,
    ) {}

    async uploadFile(userId: number, fileName: string, data: Buffer) {
        const result = await this.fileService.uploadFile(userId, fileName, data);

        return result;
    }

    async getAllFiles(userId: number) {
        const files = await this.fileService.getAllFiles(userId);
        console.log(1);

        if(files.length > 0) {
            const result = await Promise.all(files.map(async (file) => {
                const url = await this.fileService.generateUrl(file.key)
                return {
                    ...file,
                    url
                }
            }))

            return result;
        }

        return [];
    }
}