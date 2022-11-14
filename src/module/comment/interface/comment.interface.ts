export interface CommentKey {
    id: string;
}

export interface Comment extends CommentKey {
    email: string;
    comment: string;
    post_id: string;
    // ctime: number;
    // mtime: number
}