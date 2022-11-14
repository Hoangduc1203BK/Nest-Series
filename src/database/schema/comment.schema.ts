import { Schema } from 'dynamoose';

export const CommentSchema = new Schema(
    {
        id: {
            type: String,
            hashKey: true,
            required: true,
          },
        email: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        post_id: {
            type: String,
            required: true
        }
        },
        {
          timestamps: {
            createdAt: 'ctime',
            updatedAt: 'mtime',
          },
    }
)