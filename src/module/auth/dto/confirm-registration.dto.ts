import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class ConfirmRegistrationDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    email:string;


    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    confirmCode:string;
}