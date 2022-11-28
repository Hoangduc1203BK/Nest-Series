import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts, User } from 'src/database/entities';
import { UserService } from '../user';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Posts]),
        PassportModule,
    ],
    controllers: [PostController],
    providers: [PostService, UserService],
    exports: [PostService],
})

export class PostModule{}