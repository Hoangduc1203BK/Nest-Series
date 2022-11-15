import { EventGatewayModule } from './event/event.module';
import { Module,CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule, UserModule,PrivateFilesModule  } from './module';
import { RedisModule } from './redis/redis.module';
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
    UserModule,
    PrivateFilesModule,
    SocketStateModule,
    RedisModule,
    EventGatewayModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
