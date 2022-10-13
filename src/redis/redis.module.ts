import { ConfigModule } from '@nestjs/config';
import { CacheModule, Module, CACHE_MANAGER, Global } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { SharedModule } from '../config/share.module';
import { ApiConfigService } from '../config/api-config.service';
@Module({
    imports: [
        ConfigModule, SharedModule,
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host:'127.0.0.1',
            port: 6379,
            ttl: 10
        })
    ],
})
export class RedisModule {}