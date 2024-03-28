import { ACCEPTED_IMAGE_TYPES } from '@/utils'
import { z } from 'zod'

export const TagCreateInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  metaTitle: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  image: z
    .any()
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Please input jpg, jpeg, png or webp format'
    ),
  content: z.string().optional()
})

export type TagCreateInput = z.infer<typeof TagCreateInputSchema>

export const TagDetailInputSchema: any = z.object({
  title: z.string().min(1, 'Title is required'),
  metaTitle: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  image: z.any(),
  content: z.string().optional()
})

export type TagDetailInput = z.infer<typeof TagDetailInputSchema>

export const defaultValuesTagDetail: TagDetailInput = {
  title: '',
  metaTitle: '',
  slug: '',
  image: '',
  content: ''
}

export const defaultValuesTagCreate: TagCreateInput = {
  title: '',
  metaTitle: '',
  slug: '',
  image: '',
  content: ''
}
