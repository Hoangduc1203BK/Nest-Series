import { Schema } from 'dynamoose';
export const PostSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
    },
    user_id:{
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    categories: {
      type: Array<String>,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'ctime',
      updatedAt: 'mtime',
    },
  },
);

