import { JwtAuthGuard } from './../auth/guard/jwt.guard';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDto, ListUserDto, UpdateUserDto, UploadFileDto } from './dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ParseNumberQueryPipe } from '../../core/pipe';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService ) {}

    // @UseGuards(JwtAuthGuard)
    @Get('/')
    async listUsers(@Query(ParseNumberQueryPipe) query: ListUserDto) {
        return this.userService.listUser(query);
    }

    @Get('/:id')
    async getUser(@Param('id') id: string) {
        return this.userService.getUser({ id: id});
    }

    @Post('/')
    async createUser(@Body() data: CreateUserDto) {
        return this.userService.createUser(data);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string,@Body() data) {
        return this.userService.updateUser(id, data)
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