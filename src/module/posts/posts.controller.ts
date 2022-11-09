import { CheckRevokeToken } from '../auth/guard/check-revoke-token.guard';
import { HttpCacheInterceptor } from '../../core/interceptors/cache.interceptor';
import { CreatePostDto } from './dto';
import { Controller, Get, Post, Body, Req, UseGuards, Res, Param, UseInterceptors, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { PostService } from './posts.service';
import { Request } from 'express';
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    ) {}

    @UseGuards(JwtAuthGuard,CheckRevokeToken)
    @UseInterceptors(HttpCacheInterceptor)
    @CacheKey('list-posts')
    @CacheTTL(20)
    @Get('/')
    async getPosts(@Req() req: Request) {
        const result = await this.postService.getPosts(req.user.id);
        
        return result;
    }

    @UseGuards(JwtAuthGuard,CheckRevokeToken)
    @Get('/:id')
    async getPost(@Param('id') id: number) {
      const result = await this.postService.getPost(id);

      return result;
    }

    @UseGuards(JwtAuthGuard,CheckRevokeToken)
    @Post('/')
    async creatPost(@Req() req: Request,@Body() payload:CreatePostDto) {
      const result = await this.postService.createPost(req.user.id, payload)

      return result;
    }
}
