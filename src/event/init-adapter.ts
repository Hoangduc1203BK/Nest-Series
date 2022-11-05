import type { INestApplication } from '@nestjs/common';
import { JwtService} from '@nestjs/jwt';
import { RedisIoAdapter } from './redis-adapter';
import { SocketStateService } from './socket-state/socket-state.service';

export const initAdapter = async (app: INestApplication) : Promise<INestApplication> => {
    const socketStateService = app.get(SocketStateService)
    const jwtService = app.get(JwtService);

    const redisAdapter = new RedisIoAdapter(app, socketStateService, jwtService);
    await redisAdapter.connectToRedis();

    app.useWebSocketAdapter(redisAdapter);
    return app;
}