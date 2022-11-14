import { CheckRevokeToken } from '../auth/guard/check-revoke-token.guard';
import { HttpCacheInterceptor } from '../../core/interceptors/cache.interceptor';
import { CreatePostDto, ListPostDto } from './dto';
import { Controller, Get, Post, Body, Req, UseGuards, Res, Param, UseInterceptors, CacheInterceptor, CacheKey, CacheTTL, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { PostService } from './posts.service';
import { Request } from 'express';
import { Posts } from './interface/post.interface';
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    ) {}

    @Get('/all-post')
    async allPost(@Query() data:ListPostDto) {
      const result = await this.postService.allPost(data);
    }
    
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

    @Get('/:id')
    async getPost(@Param('id') id: string) {
      const result = await this.postService.getPost(id)

      return result;
    }
}
