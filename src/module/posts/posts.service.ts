import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../../database/entities';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Posts) 
        private readonly postRepos: Repository<Posts>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}

    async getBook(id: number) {
        const post = await this.postRepos.findOne({ id })
    }

    async getCache() {
         return {
            name: 'ducbk'
         };
    }
}