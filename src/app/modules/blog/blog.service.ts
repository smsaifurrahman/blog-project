import { IBlog } from './blog.interface';
import Blog from './blog.model';

const createBlogIntoDB = async (payload: IBlog) => {
  const newBlog = await Blog.create(payload);

  return newBlog;
};

const updateBlogFromDB = async (id: string, payload: Partial<IBlog>) => {
  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find().populate('author');
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogFromDB
};
