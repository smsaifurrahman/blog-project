import { Request, Response, NextFunction,  } from "express";
import catchAsync from "../utils/catchAsync";

export const addAuthorInfo = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const tokenBearer = req.headers.authorization;
        const token = tokenBearer?.split(' ')[1];
        console.log(token);
        const blog = req.body;
        console.log(blog);
    
   
     next()
    
    }
    )
    
}

