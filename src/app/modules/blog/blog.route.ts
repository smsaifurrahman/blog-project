
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BlogControllers } from './blog.controller';
import { BlogValidations } from './blog.validation';
import auth from '../../middleware/auth';
import { addAuthorInfo } from '../../middleware/addAuthor';


const router = express.Router();

router.post('/', auth('user'), addAuthorInfo(), validateRequest(BlogValidations.createBlogValidationSchema), BlogControllers.createBlog)

export const BlogRoutes = router
