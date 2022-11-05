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

    async getUserById(userId: number) {
        const user = await this.userRepos.findOne({ id: userId });

        if(!user) {
            throw new Error('User not found');
        }

        return user;
    }
}