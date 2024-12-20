import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';
import { HttpStatus } from 'http-status-ts';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import Blog from './blog.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';

const createBlog: RequestHandler = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await BlogServices.createBlogIntoDB(userData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog is created successfully',
    data: result,
    //  {
    //   _id: result._id,
    //   name: result.name,
    //   email: result.email,

    // },
  });
});

const updateBlog: RequestHandler = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const tokenBearer = req.headers.authorization;
  const token = tokenBearer?.split(' ')[1];
  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const tokenEmail = decoded.userEmail;
  const blogAuthorId = await Blog.findById(blogId);
  const authorId = blogAuthorId?.author;
  const authorInfo = await User.findById({ _id: authorId });
  // checking whether token email matches with blog author email
  if (tokenEmail !== authorInfo?.email) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'You are not Authorized');
  }

  const result = await BlogServices.updateBlogFromDB(blogId, req.body);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Blog  is updated successfully',
    data: result,
  });
});

const deleteBlog: RequestHandler = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const tokenBearer = req.headers.authorization;
  const token = tokenBearer?.split(' ')[1];
  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userEmail, role } = decoded;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Blog not found');
  }

  const authorInfo = await User.findById({ _id: blog.author });
  const authorEmail = authorInfo?.email;

  if (role !== 'admin' && userEmail !== authorEmail) {
    throw new AppError(
      HttpStatus.UNAUTHORIZED,
      'You not authorized to delete the blog',
    );
  }

  const result = await BlogServices.deleteBlogFromDB(blogId);

  sendResponse(res, {
    // statusCode: HttpStatus.OK,
    success: true,
    message: 'Blog is deleted successfully',
    statusCode: HttpStatus.OK,
    data: result
  
  });
});

const getAllBlogs: RequestHandler = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await BlogServices.getAllBlogsFromDB(query);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Blogs are retrieved successfully',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
