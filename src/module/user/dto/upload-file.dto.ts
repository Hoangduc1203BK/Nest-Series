import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class UploadFileDto{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    filename:string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    data:string;
}