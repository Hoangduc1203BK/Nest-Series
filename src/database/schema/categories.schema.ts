import { Schema } from 'dynamoose';

export const CategoriesSchema = new Schema(
    {
        id: {
            type: String,
            hashKey: true,
            required: true,
          },
          name:{
            type: String,
            required: true,
            index: true,
          },
        },
        {
          timestamps: {
            createdAt: 'ctime',
            updatedAt: 'mtime',
          },
    }
)