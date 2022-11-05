import { Categories } from '../../database/entities';
import { Injectable } from  '@nestjs/common';
import { CreateCategoriesDto } from './dto/create-categories';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()

export class CategoriesService {
    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRepos: Repository<Categories>,
    ) {}


    async getCategories() {

    }

    async createCategory(payload: CreateCategoriesDto) {
        const result = await this.categoriesRepos.save(payload);

        return result;
    }
}