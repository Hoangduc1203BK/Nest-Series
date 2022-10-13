import { RedisModule } from './../../redis/redis.module';
import { CACHE_MANAGER, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../database/database.module';
import { Posts } from '../../database/entities';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';
@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Posts]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
