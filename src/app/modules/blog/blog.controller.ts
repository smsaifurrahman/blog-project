import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';


const createBlog: RequestHandler = catchAsync(async (req, res, next) => {
  const userData = req.body;
  const result = await BlogServices.createBlogIntoDB(userData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog is created successfully',
    data: result
    //  {
    //   _id: result._id,
    //   name: result.name,
    //   email: result.email,

    // },
  });
});


export const BlogControllers = {
    createBlog
}
