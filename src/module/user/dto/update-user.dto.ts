import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsArray, IsNumber, IsOptional } from "class-validator";

export class UpdateUserDto{
    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @IsEmail()
    email:string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name:string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    birthDate:string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    address:string;
}