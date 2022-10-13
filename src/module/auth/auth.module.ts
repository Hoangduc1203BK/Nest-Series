import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { DatabaseModule } from '../../database/database.module';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
// import { LocalStrategy, JwtStrategy } from './strategy/index'
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { ApiConfigService } from "../../config/api-config.service";
import { SharedModule } from "../../config/share.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User, Token } from '../../database/entities';
import { LocalStrategy } from "./strategy";
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
    controllers: [AuthController],
    providers: [AuthService, ApiConfigService, LocalStrategy],
    exports: [],
})
export class AuthModule {}