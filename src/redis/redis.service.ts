import { Inject, Injectable } from '@nestjs/common';
import IORedis from 'ioredis'

import { IORedisKey, userOnlineKey } from './redis.enum';

@Injectable()
export class RedisService {
    constructor(@Inject(IORedisKey) private readonly redisClient: IORedis) {}

    async get(key: string): Promise<string> {
        const result = await this.redisClient.get(key);
        
        return result;
    }

    async set(key: string,value: any, ttl?: number): Promise<void> {
        await this.redisClient.set(key,value)
        if(ttl) {
        await this.redisClient.expire(key,ttl);
        }
    }
    

    async removeUseOnl(userId: number, socketId: string) : Promise<boolean> {
        await this.redisClient.srem(userOnlineKey(userId), socketId);

        const sockets = await this.redisClient.smembers(userOnlineKey(userId));

        if(sockets.length === 0) {
            await this.redisClient.del(userOnlineKey(userId))
        }

        return true;
    }

    async setUserOnline(userId: number, socketId: string) {
        await this.redisClient.sadd(userOnlineKey(userId), socketId);
    
        return true;
      }
}