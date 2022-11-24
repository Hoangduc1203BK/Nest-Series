import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts, User } from 'src/database/entities';
import { UserService } from '../user';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Posts])],
    controllers: [PostController],
    providers: [PostService, UserService],
    exports: [PostService],
})

export class PostModule{}