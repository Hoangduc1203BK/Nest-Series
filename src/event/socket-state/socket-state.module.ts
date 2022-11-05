import { ApiConfigService } from './../../config/api-config.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './../../module/user/user.module';
import { RedisService } from './../../redis/redis.service';
import { RedisModule } from './../../redis/redis.module';
import { CacheModule, Global, Module } from '@nestjs/common';
import { SocketStateService } from './socket-state.service';
import { IORedisModule } from '../../redis/io-redis.module';


@Module({
    imports: [
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
    providers: [RedisService,SocketStateService],
    exports: [SocketStateService],
})
export class SocketStateModule {}