import { Token } from './../database/entities/token.entity';
import { User } from './../database/entities/user.entity';
import { ApiConfigService } from './../config/api-config.service';
import { SharedModule } from './../config/share.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        DatabaseModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ ConfigModule,SharedModule ],
            useFactory: (configService: ApiConfigService) => ({
                secret: configService.getAuthConfig().secret,
                signOptions: {
                    expiresIn: `${configService.getAuthConfig().exprireTime}s`
                }
            }),
            inject: [ApiConfigService]
        }),
        TypeOrmModule.forFeature([ User, Token ]),
    ],
    providers: [EventGateway],
    exports: [EventGateway]
})
export class EventGatewayModule {}