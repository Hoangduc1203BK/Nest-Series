import { Body, Controller, Get, Post} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories';


@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post('/')
    async createCategories(@Body() payload: CreateCategoriesDto) {
        const result = await this.categoriesService.createCategory(payload);

        return result;
    }
}