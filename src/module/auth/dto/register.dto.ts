import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";
export class RegisterDto{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    name:string;


    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    phoneNumber:string;


    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    birthDate:string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsString()
    address:string;
}