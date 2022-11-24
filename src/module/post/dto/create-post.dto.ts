import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsArray, IsNumber } from "class-validator";

export class CreatePostDto{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    title:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    content:string;
}