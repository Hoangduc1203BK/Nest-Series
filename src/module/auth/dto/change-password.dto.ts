import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class ChangePasswordDto{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    email:string;


    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    currentPassword:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    newPassword:string;
}