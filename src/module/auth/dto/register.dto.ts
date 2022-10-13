import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class RegisterDto{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name:string;
}