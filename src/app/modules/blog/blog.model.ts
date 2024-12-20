import mongoose, { Schema, model } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema: Schema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Blog = model<IBlog>('Blog', blogSchema);

export default Blog;
