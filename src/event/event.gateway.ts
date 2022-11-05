import { ApiConfigService } from './../config/api-config.service';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';


@WebSocketGateway({
    cors: {
        origin: '*'
    },
})

export class EventGateway  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    constructor(private readonly jwtService: JwtService, private readonly configService: ApiConfigService) {}

    async handleConnection(socket: any) {
    }

    async handleDisconnect(client: any) {
        console.log('Client disconnect');
    }

    async afterInit(server: any) {
    }

    @SubscribeMessage('join-chat-room')
    async handleMessage(@MessageBody() data:any, @ConnectedSocket() client: any) {
        console.log(data);
        console.log(2);

        return true;
    }
}