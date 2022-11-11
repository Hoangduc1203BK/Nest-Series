import { CheckRevokeToken } from '../auth/guard/check-revoke-token.guard';
import { HttpCacheInterceptor } from '../../core/interceptors/cache.interceptor';
import { CreatePostDto } from './dto';
import { Controller, Get, Post, Body, Req, UseGuards, Res, Param, UseInterceptors, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { PostService } from './posts.service';
import { Request } from 'express';
import { Posts } from './interface/post.interface';
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async creatPost(@Req() req: Request,@Body() payload: CreatePostDto) {
      const result = await this.postService.createPost(req.user.email, payload)

      return result;
    }
    

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async listPost(@Req() req: Request) {
      const result = await this.postService.listPost(req.user.email)

      return result;
    }
}
