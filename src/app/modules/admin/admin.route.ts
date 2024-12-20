import express from 'express';

import auth from '../../middleware/auth';
import { BlogControllers } from '../blog/blog.controller';
import { AdminController } from './admin.controller';

const router = express.Router();
router.patch('/users/:userId/block', auth('admin'), AdminController.blockUser);
router.delete('/blogs/:blogId', auth('admin'), BlogControllers.deleteBlog);

export const AdminRoutes = router;
