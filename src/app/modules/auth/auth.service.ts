import { HttpStatus } from 'http-status-ts';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payLoad: TLoginUser) => {
  const user = await User.isUserExitsByEmail(payLoad.email);
 console.log(user);
  if (!user) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User is not found');
  }

  if (!(await User.isUserBlocked(user.isBlocked))) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'User is blocked');
  }
  if (!(await User.isPasswordMatched( payLoad?.password ,user.password ))) {
    throw new AppError(HttpStatus.BAD_REQUEST, 'Password do not match');
  }
};


export const AuthServices = {
    loginUser
}