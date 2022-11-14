import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsArray } from "class-validator";

export class ListPostDto{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    email:string;
}