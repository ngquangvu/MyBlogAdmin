import { ACCEPTED_IMAGE_TYPES } from '@/utils'
import { z } from 'zod'

export const CategoryCreateInputSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    metaTitle: z.string().optional(),
    slug: z.string().min(1, 'Slug is required'),
    image: z
    .any()
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Please input jpg, jpeg, png or webp format'
    ),
    content: z.string().optional(),
  })

export type CategoryCreateInput = z.infer<typeof CategoryCreateInputSchema>

export const CategoryDetailInputSchema: any = z
  .object({
    title: z.string().min(1, 'Title is required'),
    metaTitle: z.string().optional(),
    slug: z.string().min(1, 'Slug is required'),
    image: z.any(),
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
