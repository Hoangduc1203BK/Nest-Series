import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from '../config/api-config.service';
import { SharedModule } from '../config/share.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, SharedModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => ({
        type: 'postgres',
        host: configService.getDBConfig().host,
        port: configService.getDBConfig().port,
        username: configService.getDBConfig().username,
        password: configService.getDBConfig().password,
        database: configService.getDBConfig().database,
        
        synchronize: true,
        keepConnectionAlive: true,
        entities: [
          // `${rootDir}/databases/entities/index.{js,ts}`,
          './dist/database/entities/index.{js,ts}',
        ],
      })
    }),
  ],
  providers: [ApiConfigService],
  exports: [],
})
export class DatabaseModule {}
