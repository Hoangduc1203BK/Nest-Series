import { Body, Controller, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

@Controller('categories')
export class CategoriesController{
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post('/')
    async createCategories(@Body('name') name:string) {
        return this.categoriesService.createCategories(name);
    }
}