import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './upload.service';
import { File } from '../../database/entities';
@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
  ],
  providers: [FileService],
  exports: [FileService]
})
export class PrivateFilesModule {}