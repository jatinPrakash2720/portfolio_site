import {z} from 'zod'

export const userCreationSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters.' }).max(20),
    fullName:z.string().min(1,{message:'Full name is required.'}),
    email:z.string().email({message:'Invalid email address.'}),
})

export const userUpdateSchema = z.object({
    fullName:z.string().min(1).optional(),
    headline:z.string().max(100).optional(),
    bio:z.string().max(1000).optional(),
    profilePictureUrl:z.string().min(1).optional(),
    socialLinks:z.object({
        github:z.string().optional(),
        linkedin:z.string().optional(),
        twitter:z.string().optional(),
    }).optional(),
})