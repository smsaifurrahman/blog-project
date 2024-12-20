import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { loginValidationSchema } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
