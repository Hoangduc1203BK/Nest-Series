import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export interface GetUserDto{
    email?: string;
    id?: string;
}