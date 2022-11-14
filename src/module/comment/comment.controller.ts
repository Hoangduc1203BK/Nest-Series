import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';
import { Request } from 'express';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createComment(@Req() req: Request, @Body() data: CreateCommentDto) {
        return this.commentService.createComment(req.user.email, data)
    }
}