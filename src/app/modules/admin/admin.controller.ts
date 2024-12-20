import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';
import sendResponse from '../../utils/sendResponse';
import { HttpStatus } from 'http-status-ts';

const blockUser: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AdminServices.blockUserIntoDB(userId);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'User is blocked',
  });
});


export const AdminController = {
    blockUser
}
