import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsArray, IsNumber, IsOptional } from "class-validator";

export class UpdateUserDto{
    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    email:string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    username:string;
    
    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    age:string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    address: string;
}