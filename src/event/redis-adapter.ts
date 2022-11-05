/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { INestApplicationContext, WebSocketAdapter } from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
const { createAdapter } = require('@socket.io/redis-adapter');
import type { User } from '../database/entities/user.entity';
import { createClient } from 'redis';
import type { Server, ServerOptions, Socket } from 'socket.io';

import type { SocketStateService } from './socket-state/socket-state.service';


export interface IAuthenticatedSocket extends Socket {
  userId: number;
  data: User;
}

export class RedisIoAdapter extends IoAdapter implements WebSocketAdapter {
  public constructor(
    private readonly app: INestApplicationContext,
    private readonly socketStateService: SocketStateService,
    private jwtService: JwtService,
  ) {
    super(app);
  }

  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({ url: 'redis://localhost:6379' });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);

    return server;
  }

  public create(port: number, options: ServerOptions): Server {
    const server = this.createIOServer(port, options);

    server.use((socket: IAuthenticatedSocket, next) => {
      const token = (socket.handshake.query?.token || socket.handshake.headers?.authorization) as string;
      if (!token) {
        socket.userId = null;

        // not authenticated connection is still valid
        // thus no error
        return next();
      }

      try {
        const decoded = this.jwtService.verify(token);
        socket.userId = decoded.sub

        return next();
      } catch (error) {
        setTimeout(() => {
          socket.disconnect(true);
        },5000);

        return next(error);
      }
    });

    return server;
  }

  public bindClientConnect(server: Server, callback: Function): void {
    server.on('connection', (socket: IAuthenticatedSocket) => {
        if (socket?.userId) {
          this.socketStateService.add(socket?.userId, socket);
   
          socket.on('disconnect', () => {
            this.socketStateService.remove(socket?.userId, socket);
          });
        }
   
        callback(socket);
      });
  }
}
