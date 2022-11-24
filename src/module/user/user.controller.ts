import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";
import { CreateUserDto, ListUserDto, UpdateUserDto } from './dto';
import { UserService } from "./user.service";
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    async getMe(@Req() req: Request) {
        const user = await this.userService.getUser({ id: req.user.id});

        return user;
    }
    
    @Get('/')
    async listUser(@Query() data: ListUserDto) {
        const users = await this.userService.listUser(data);

        return users;
    }

    @Get('/:id')
    async getUser(@Param('id') id: number) {
        const user = await this.userService.getUser({ id });

        return user;
    }

    @Post('/')
    async createUser(@Body() data: CreateUserDto) {
        const user = await this.userService.createUser(data);

        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    async updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
        const user = await this.userService.updateUser(id, data);

        return user;
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        await this.userService.deleteUser(id);

        return {
            success: true
        }
    }
}