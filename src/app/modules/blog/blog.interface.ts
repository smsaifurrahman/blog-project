import { Types } from "mongoose";

export interface IBlog {
    title: string; // The title of the blog post
    content: string; // The main body or content of the blog post
    author: Types.ObjectId; // A reference to the User model
    isPublished?: boolean; // Optional; defaults to true if not specified
  }