import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCommentDto{
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    comment: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    post_id: string;
}
