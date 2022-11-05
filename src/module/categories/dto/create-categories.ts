import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoriesDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}