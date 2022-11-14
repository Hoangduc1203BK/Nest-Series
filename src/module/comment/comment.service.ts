import { Injectable } from "@nestjs/common";
import { InjectModel, Model } from "nestjs-dynamoose";
import { CreateCommentDto } from "./dto";
import { CommentKey, Comment } from "./interface/comment.interface";
import { v4 as uuidv4} from 'uuid';
import { PostService } from "../posts";
import { UserService } from "../user";
@Injectable()
export class CommentService{
    constructor(
        @InjectModel('Comment') private readonly commentModel: Model<Comment, CommentKey>,
        private readonly postService: PostService,
        private readonly userService: UserService,
    ) {}

    async createComment(email:string, payload: CreateCommentDto){
        console.log(payload);
        console.log(email);
        const data = {
            id: uuidv4(),
            email: email,
            ...payload
        }
        await this.userService.getUser({email});

        await this.postService.getPost(payload.post_id);

        return this.commentModel.create(data)
        
    }

}