import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import { CategoriesSchema } from "../../database/schema";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
    imports: [
        DynamooseModule.forFeature([{ name: 'Categories', schema: CategoriesSchema}])
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService],
    exports: [CategoriesService],
})
export class CategoriesModule{}