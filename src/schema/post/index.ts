import { ACCEPTED_IMAGE_TYPES } from '@/utils'
import { z } from 'zod'

export const PostCreateInputSchema = z.object({
  authorId: z.string(),
  title: z.string(),
  metaTitle: z.string().optional(),
  slug: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  thumbnail: z
    .any()
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), 'Please input jpg, jpeg, png or webp format'),
  published:z.string()
})

export type PostCreateInput = z.infer<typeof PostCreateInputSchema>

export const PostDetailInputSchema: any = z.object({
  title: z.string(),
  metaTitle: z.string().optional(),
  slug: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  thumbnail: z.any(),
  published:z.string()
})

export type PostDetailInput = z.infer<typeof PostDetailInputSchema>

export const defaultValuesPostDetail: PostDetailInput = {
  authorId: '',
  title: '',
  metaTitle: '',
  slug: '',
  summary: '',
  content: '',
  thumbnail: '',
  published: ''
}

export const defaultValuesPostCreate: PostCreateInput = {
  authorId: '',
  title: '',
  metaTitle: '',
  slug: '',
  summary: '',
  content: '',
  thumbnail: '',
  published: ''
}
