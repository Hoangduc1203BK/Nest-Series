import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsArray, IsNumber } from "class-validator";

export class CreateUserDto{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    birthDate:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    address:string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    phoneNumber:string;
}