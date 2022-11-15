import { PrivateFilesModule } from './../upload/upload.module';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User,File } from '../../database/entities';
import { JwtStrategy } from '../auth/strategy/jwt-strategy';
import { DynamoDBConfig } from '../../database/database.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,File]),
    PrivateFilesModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, DynamoDBConfig],
  exports: [UserService]
})
export class UserModule {};