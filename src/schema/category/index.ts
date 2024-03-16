import { z } from 'zod'

export const CategoryCreateInputSchema = z
  .object({
    parentId: z.number().optional(),
    title: z.string().min(1, 'Title is required'),
    metaTitle: z.string().optional(),
    slug: z.string().min(1, 'Slug is required'),
    image: z.string().optional(),
    content: z.string().optional(),
  })

export type CategoryCreateInput = z.infer<typeof CategoryCreateInputSchema>

export const CategoryDetailInputSchema: any = z
  .object({
    parentId: z.number().optional(),
    title: z.string().min(1, 'Title is required'),
    metaTitle: z.string().optional(),
    slug: z.string().min(1, 'Slug is required'),
    image: z.string().optional(),
    content: z.string().optional(),
  })

export type CategoryDetailInput = z.infer<typeof CategoryDetailInputSchema>

export const defaultValuesCategoryDetail: CategoryDetailInput = {
  title: '',
  metaTitle: '',
  slug: '',
  image: '',
  content: ''
}

export const defaultValuesCategoryCreate: CategoryCreateInput = {
  title: '',
  metaTitle: '',
  slug: '',
  image: '',
  content: ''
}
