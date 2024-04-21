export type PostImage = {
  id: string
  authorId: string
  url: string
  name: string
  originalName: string
  sizeKb: string
  mimeType: string
  sizeType: string
  width: number
  height: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type PostTag = {
  id: string
  title: string
  metaTitle: string
  slug: string
  content: string
  image: string
}

export type Post = {
  id: string
  authorId: string
  title: string
  metaTitle: string
  slug: string
  summary: string
  postTags: PostTag[]
  content: string
  thumbnail: string
  published: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type PostsSearchQuery = {
  page: number
  limit: number
  search: string
}

export type PostsResponseDataType = {
  data: Post[]
  totalCount: number
}

export type PostMutate = {
  id?: string
  authorId?: string
  title?: string
  metaTitle?: string
  slug?: string
  summary?: string
  tagIds?: string
  content?: string
  thumbnail?: string
  published?: boolean
}

export const postsQueryKey = 'posts'
export const postQueryKey = 'post'
