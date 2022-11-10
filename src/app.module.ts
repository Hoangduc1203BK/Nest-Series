import { EventGatewayModule } from './event/event.module';
import { Module,CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PostModule, AuthModule, UserModule,PrivateFilesModule, CategoriesModule  } from './module';
import { RedisModule } from './redis/redis.module';
import * as redisStore from 'cache-manager-redis-store';
import { SocketStateModule } from './event/socket-state/socket-state.module';
import { StudentModule } from './module/student/student.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    PostModule,
    UserModule,
    PrivateFilesModule,
    CategoriesModule,
    SocketStateModule,
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: '127.0.0.1',
    //   port: 6379
    // })
    RedisModule,
    EventGatewayModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
