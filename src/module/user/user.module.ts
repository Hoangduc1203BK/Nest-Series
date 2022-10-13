import { PrivateFilesModule } from './../upload/upload.module';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User,File } from '../../database/entities';
import { JwtStrategy } from '../auth/strategy/jwt-strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([User,File]),
    PrivateFilesModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}