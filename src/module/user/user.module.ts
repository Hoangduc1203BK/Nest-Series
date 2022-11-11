import { PrivateFilesModule } from './../upload/upload.module';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User,File } from '../../database/entities';
import { JwtStrategy } from '../auth/strategy/jwt-strategy';
import { AuthModule } from '../auth';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from '../../database/schema';

const schema = [
  { name: 'User', schema: UserSchema}
]
@Module({
  imports: [
    TypeOrmModule.forFeature([User,File]),
    DynamooseModule.forFeature(schema),
    PrivateFilesModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule {};