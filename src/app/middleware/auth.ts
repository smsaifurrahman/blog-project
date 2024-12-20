import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { HttpStatus } from 'http-status-ts';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requireRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenBearer = req.headers.authorization;
    const token = tokenBearer?.split(' ')[1];
    const blog = req.body;

    console.log(token);

    // check if the token is sent from client
    if (!token) {
      throw new AppError(HttpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    console.log(decoded);

    const { role, userEmail } = decoded;


    // checking if the user exists!
    const user = await User.isUserExitsByEmail(userEmail);

    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, 'This User is not found');
    }

    // checking if the User is blocked
    if (!(await User.isUserBlocked(user.isBlocked))) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'User is blocked');
    }

    if (requireRoles && !requireRoles.includes(role)) {
      throw new AppError(HttpStatus.UNAUTHORIZED, 'You are not authorized');
    }


    next();
  });
};

export default auth;