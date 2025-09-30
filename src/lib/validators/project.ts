import { z } from 'zod'

export const projectCreationSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters.' })
    .max(100),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 100 characters.' })
    .max(1000),
  liveUrl: z.string().url({ message: 'Invalid URL.' }).optional(),
  sourceCodeUrl: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .optional()
    .or(z.literal('')),
  technologies: z
    .array(z.string())
    .min(1, { message: 'At least one technology is required.' }),
})

export const projectUpdateSchema = projectCreationSchema.partial()