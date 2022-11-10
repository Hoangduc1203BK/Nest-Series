import { JwtAuthGuard } from './../auth/guard/jwt.guard';
import { Body, Controller, Get, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDto, UploadFileDto } from './dto';
import { Request } from  'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async listUsers() {
        // return this.userService.listUser();
        return true;
    }

    // @UseGuards(JwtAuthGuard)
    // @ApiConsumes('multipart/form-data')
    // @UseInterceptors(FileInterceptor('file'))
    // @Post('file')
    // async addFile(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    //     const result = await this.userService.uploadFile(req.user.id, file.originalname, file.buffer);

    //     return result;
    // }

    // @UseGuards(JwtAuthGuard)
    // @Get('/file')
    // async getAllFiles(@Req() req: Request) {
    //     const result = await this.userService.getAllFiles(req.user.id);
    //     return result;
    // }

}