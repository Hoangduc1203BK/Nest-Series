import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { CommentSchema, PostSchema, UserSchema } from '../../database/schema';
import { PostModule, PostService } from '../posts';
import { UserService } from '../user';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

const schema = [
  { name: 'Comment', schema: CommentSchema },
  { name: 'Users', schema: UserSchema },
  { name: 'Post', schema: PostSchema },
];
@Module({
  imports: [PostModule, DynamooseModule.forFeature(schema)],
  controllers: [CommentController],
  providers: [CommentService, PostService, UserService],
  exports: [CommentService],
})
export class CommentModule {}
