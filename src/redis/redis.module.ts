import * as redisStore from 'cache-manager-redis-store';
/* eslint-disable import/no-namespace */
import { CacheModule, Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiConfigService } from '../config/api-config.service';
import { IORedisModule } from './io-redis.module';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [
    CacheModule.register({
        isGlobal: true,
        store: redisStore,
        host:'127.0.0.1',
        port: 6379,
        ttl: 10
    }),
    IORedisModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ApiConfigService) => {

        return {
          connectionOptions: {
            host: configService.getRedisConfig().host,
            port: configService.getRedisConfig().port,
          },
          onClientReady: (client) => {
            console.log('Redis client ready');

            client.on('error', (err) => {
              console.error('Redis Client Error: ', err);
            });

            client.on('connect', () => {
              console.log(`Connected to redis on ${client.options.host}:${client.options.port}`);
            });
          },
        };
      },
      inject: [ApiConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
