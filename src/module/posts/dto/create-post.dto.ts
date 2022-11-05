import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsArray } from "class-validator";

export class CreatePostDto{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    title:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    author:string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    content:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsArray()
    categoriesIds: number[];
}