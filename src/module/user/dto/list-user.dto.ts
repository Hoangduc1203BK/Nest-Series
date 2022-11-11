import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class ListUserDto{
    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsOptional()
    @IsNumberString()
    page:number;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @IsOptional()
    @IsNumberString()
    limit:number;
}