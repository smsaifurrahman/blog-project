
import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/api/auth/register', UserControllers.createUser)

export const UserRoutes = router