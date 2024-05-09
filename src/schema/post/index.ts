import { ACCEPTED_IMAGE_TYPES } from '@/utils'
import { z } from 'zod'

export const PostCreateInputSchema = z.object({
  authorId: z.string(),
  title: z.string().min(1, 'Title is required'),
  metaTitle: z.string().optional(),
  slug: z.string().optional(),
  summary: z.string().max(256, 'Slug is too long').optional(),
  tagIds: z.string().optional(),
  cateIds: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  thumbnail: z
    .any()
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), 'Please input jpg, jpeg, png, webp or svg format'),
  published: z.boolean()
})

export type PostCreateInput = z.infer<typeof PostCreateInputSchema>

export const PostDetailInputSchema: any = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string().min(1, 'Title is required'),
  metaTitle: z.string().optional(),
  slug: z.string().optional(),
  summary: z.string().max(256, 'Slug is too long').optional(),
  tagIds: z.string().optional(),
  cateIds: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  thumbnail: z.any(),
  published: z.boolean()
})

export type PostDetailInput = z.infer<typeof PostDetailInputSchema>

export const defaultValuesPostDetail: PostDetailInput = {
  id: '',
  authorId: '',
  title: '',
  metaTitle: '',
  slug: '',
  summary: '',
  tagIds: '',
  cateIds: '',
  content: '',
  thumbnail: '',
  published: true
}

export const defaultValuesPostCreate: PostCreateInput = {
  authorId: '',
  title: '',
  metaTitle: '',
  slug: '',
  summary: '',
  tagIds: '',
  cateIds: '',
  content: '',
  thumbnail: '',
  published: true
}
