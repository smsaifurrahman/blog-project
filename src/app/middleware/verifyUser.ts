import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { User } from '../modules/user/user.model';

export const verifyUser = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenBearer = req.headers.authorization;
    const token = tokenBearer?.split(' ')[1];
    const decoded = jwt.verify(
      token as string,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // console.log(decoded);
    const { _id } = await User.findOne({ email: decoded.userEmail });

    const author = _id;
    req.body.author = author;
    console.log(req.body);

    next();
  });
};
