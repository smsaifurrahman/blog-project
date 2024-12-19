import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import  {HttpStatus}  from 'http-status-ts';

const createUser: RequestHandler = catchAsync(async (req, res, next) => {
  const userData = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result
    //  {
    //   _id: result._id,
    //   name: result.name,
    //   email: result.email,

    // },
  });
});


export const UserControllers = {
    createUser
}
