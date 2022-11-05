import { UserService } from './../../module/user/user.service';
import { RedisService } from './../../redis/redis.service';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
@Injectable()
export class SocketStateService {
    private socketState = new Map<number, Socket[]>()
    constructor(private readonly redisService: RedisService) {}

    async add(userId: number, socket: Socket): Promise<boolean> {
        await this.redisService.setUserOnline(userId, socket.id);
        const existSockets = this.socketState.get(userId) || [];

        const sockets = [...existSockets, socket];

        this.socketState.set(userId, sockets);

        return true;
    }


    async remove(userId: number, socket: Socket) : Promise<boolean> {
        const existSockets = this.socketState.get(userId)

        await this.redisService.removeUseOnl(userId, socket.id)
        if(!existSockets) {
            return true;
        }

        const sockets = existSockets.filter((s) => s.id !== socket.id);

        if(sockets.length === 0) {
            this.socketState.delete(userId);
        } else {
            this.socketState.set(userId, sockets)
        }

        return true;
    }

    public get(userId: number): Socket [] {
        return this.socketState.get(userId) || [];
    }


    public getAll(): Socket[] {
        const all = [];

        for(let socket of this.socketState) {
            all.push(socket);
        }

        return all;
    }
}