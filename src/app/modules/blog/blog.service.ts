import { IBlog } from "./blog.interface";
import Blog from "./blog.model";


const createBlogIntoDB = async ( payload: IBlog) => {

    
  const newBlog = await Blog.create(payload);

  return newBlog;

}

export const BlogServices = {
    createBlogIntoDB,
  };