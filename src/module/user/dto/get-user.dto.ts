import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber } from "class-validator";

export class GetUserDto{
    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @IsEmail()
    email?:string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    id?:number;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    password?:string;
}