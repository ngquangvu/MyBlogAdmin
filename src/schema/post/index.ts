import { z } from 'zod'

export const PostCreateInputSchema = z.object({
  authorId: z.string(),
  title: z.string(),
  metaTitle: z.string().optional(),
  slug: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  thumbnail: z.string().optional(),
  published: z.boolean()
})

export type PostCreateInput = z.infer<typeof PostCreateInputSchema>

export const PostDetailInputSchema: any = z.object({
  title: z.string(),
  metaTitle: z.string().optional(),
  slug: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  thumbnail: z.string().optional(),
  published: z.boolean()
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
  published: true
}

export const defaultValuesPostCreate: PostCreateInput = {
  authorId: '',
  title: '',
  metaTitle: '',
  slug: '',
  summary: '',
  content: '',
  thumbnail: '',
  published: true
}
