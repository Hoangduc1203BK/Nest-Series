import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumberString } from "class-validator";

export class ListUserDto{
    @ApiProperty({required: false})
    @IsOptional()
    @IsNumberString()
    @IsNotEmpty()
    page: string;

    @ApiProperty({required: false})
    @IsOptional()
    @IsNumberString()
    @IsNotEmpty()
    limit: string;
}