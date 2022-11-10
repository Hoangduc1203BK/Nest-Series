import { PrivateFilesModule } from './../upload/upload.module';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User,File } from '../../database/entities';
import { JwtStrategy } from '../auth/strategy/jwt-strategy';
import { StoreModule } from '../store/store.module';
import { StoreService } from '../store/store.service';
import { AuthModule } from '../auth';
@Module({
  imports: [
    TypeOrmModule.forFeature([User,File]),
    PrivateFilesModule,
    StoreModule.register({
      path: 'store',
      fileName: 'user'
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule {};