import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getHello() {
    await this.cacheManager.set('cache-key', {username: 'ducbk'})
    const result = await this.cacheManager.get('cache-key')
    console.log(result);
    return 'Hello World!';
  }
}
