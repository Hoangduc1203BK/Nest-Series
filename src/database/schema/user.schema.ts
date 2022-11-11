import { Schema, model } from 'dynamoose';

export const UserSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
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

export const User = model('User', UserSchema);