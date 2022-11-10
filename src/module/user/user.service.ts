import { ChangePasswordDto } from './dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities';
import { StoreService } from '../store/store.service';
import { FileService } from '../upload/upload.service';
import { UploadFileDto } from './dto';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ApiConfigService } from 'src/config/api-config.service';
import { AuthService } from '../auth';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepos: Repository<User>,
        private readonly configService: ApiConfigService,
        private readonly fileService: FileService,
        private readonly storeSevice: StoreService,
    ) {}

    async getUserById(userId: number) {
        const user = await this.userRepos.findOne({ id: userId });

        if(!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async listUser() {
        // await this.storeSevice.save()
        // const users = await this.userRepos.find();

        // return users;

        const { region, authority, userPoolID } = this.configService.getCognitoConfig();
        const provider = new CognitoIdentityServiceProvider({
            region, 
            endpoint: authority,
        });

        try {
            const result = await provider.listUsers({
                UserPoolId: userPoolID
            }).promise()

            console.log('result:::',result);
            return result;
        } catch (error) {
            throw new Error(error)
        }
    }
}