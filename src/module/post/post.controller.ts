import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";
import { CreatePostDto } from "./dto/create-post.dto";
import { Request } from "express";
import { PostService } from "./post.service";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}


    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createPost(@Req() req: Request, @Body() data: CreatePostDto) {
        const userId = req.user.id;
        const result = await this.postService.createPost(userId, data);

        return result;
    }
}