import { z } from "zod";
const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        content: z.string(),
    })
})


export const BlogValidations = {
    createBlogValidationSchema
}