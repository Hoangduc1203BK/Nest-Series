import { Categories } from '../../database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([ Categories ])
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService],
    exports: [],
})

export class CategoriesModule {}