import { Controller, Get, Post, Body, Req, UseGuards, Res, Param, UseInterceptors, CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/common';
import { ApiConfigService } from '../../config/api-config.service';
import { PostService } from './posts.service';
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    ) {}

    @Get('/:id')
    async getPost(@Param('id') id: number) {
        const result = await this.postService.getBook(id);
        
        return result;
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(5)
    async getCacte() {
      const result = await this.postService.getCache();
      console.log(result);
      return result;
    }
}
