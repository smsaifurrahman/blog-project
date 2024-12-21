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

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findOneAndDelete({ _id: id });

  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content'];
  let searchTerm = '';
  if (query?.search) {
    searchTerm = query?.search as string;
  }

  // Searching
  const searchQuery = Blog.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  let sortBy = 'createdAt';
  if (query?.sortBy) {
    sortBy = query?.sortBy as string;
  }

  // sort Query
  const sortQuery = searchQuery.sort(sortBy);

  // sort Order

  // let sortOrder = 'asc';
  if (query?.sortOrder && query?.sortOrder === 'asc') {
    sortBy = `${query?.sortBy}`;
  } else if (query?.sortOrder && query?.sortOrder === 'desc') {
    sortBy = `-${query?.sortBy}`;
  }

  // const sortOrderQuery
  const sortOrderQuery = sortQuery.sort(sortBy);

  // filter

  let filteredQuery = sortOrderQuery;
  if (query?.filter) {
    const filter = query?.filter as string;
    filteredQuery = sortOrderQuery.find({ author: filter });
  }

  const result = await filteredQuery.populate('author');

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogFromDB,
  deleteBlogFromDB,
};
