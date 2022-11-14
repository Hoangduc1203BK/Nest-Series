import { Injectable } from "@nestjs/common";
import { InjectModel, Model } from "nestjs-dynamoose";
import { CategoriesKey, Categories } from "./interface/cateories.interface";
import { v4 as uuidv4} from 'uuid';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel('Categories') private readonly categoriesModel: Model<Categories, CategoriesKey>
    ) {}

    async getCategories(id: string) {
        const result = await this.categoriesModel.get({id});

        if(!result) {
            throw new Error('Categories not found');
        }

        return result;
    }

    async createCategories(name: string) {
        const doc = {
            id: uuidv4(),
            name
        }

        return this.categoriesModel.create(doc);
    }
}