import { Module } from '@nestjs/common'
import { UserService } from '../user';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [],
    controllers: [PostController],
    providers: [PostService, UserService],
    exports: [PostService],
})

export class PostModule{}