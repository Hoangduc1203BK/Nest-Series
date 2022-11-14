import { AuthModule } from './../auth/auth.module';
import { RedisModule } from './../../redis/redis.module';
import { FileService } from '../upload/upload.service';
import { ApiConfigService } from '../../config/api-config.service';
import { SharedModule } from '../../config/share.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { CACHE_MANAGER, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../../database/database.module';
import { Posts, User, Token, File } from '../../database/entities';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';
import { LocalSerializer, LocalStrategy } from '../auth/strategy';
import { AuthService } from '../auth';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user';
import { DynamooseModule } from 'nestjs-dynamoose';
import { PostSchema, UserSchema } from '../../database/schema';
// import { MailService } from '../mail/mail.service';
@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, SharedModule],
      useFactory: (configService: ApiConfigService) => ({
        secret: configService.getAuthConfig().secret,
        signOptions: {
          expiresIn: `${configService.getAuthConfig().exprireTime}s`,
        },
      }),
      inject: [ApiConfigService],
    }),
    TypeOrmModule.forFeature([Posts, User, Token, File]),
    DynamooseModule.forFeature([{ name: 'Users', schema: UserSchema}, { name: 'Post', schema: PostSchema}])
  ],
  controllers: [PostController],
  providers: [PostService, AuthService, UserService, FileService, LocalStrategy, LocalSerializer],
})
export class PostModule {}
