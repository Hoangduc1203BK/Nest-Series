import { EventGatewayModule } from './event/event.module';
import { Module,CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule, UserModule,PrivateFilesModule  } from './module';
import { RedisModule } from './redis/redis.module';
import { SocketStateModule } from './event/socket-state/socket-state.module';
import { PostModule } from './module/post/post.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    PostModule,
    PrivateFilesModule,
    SocketStateModule,
    RedisModule,
    EventGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
