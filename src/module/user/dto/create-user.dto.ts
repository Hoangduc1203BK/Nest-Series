import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsArray, IsNumber } from "class-validator";

export class CreateUserDto{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    email:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    username:string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    age:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    address: string;
}