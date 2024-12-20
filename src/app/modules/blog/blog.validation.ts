import { z } from "zod";

const createBlogValidationSchema  = z.object({
    body: z.object({
        title: z.string(),
        content: z.string(),
    })
})
const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({invalid_type_error: "Title must be string"}).optional(),
        content: z.string({invalid_type_error: "Title must be string"}).optional(),
    })
})


export const BlogValidations = {
    createBlogValidationSchema,
    updateBlogValidationSchema
}