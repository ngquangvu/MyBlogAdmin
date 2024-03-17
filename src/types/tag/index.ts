export type Tag = {
  id: number
  title: string
  metaTitle: string
  slug: string
  image: string
  content: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type TagsSearchQuery = {
  page: number
  limit: number
  search: string
}

export type TagsResponseDataType = {
  data: Tag[]
  totalCount: number
}

export type TagMutate = {
  id?: number
  title?: string
  metaTitle?: string
  slug?: string
  image?: string
  content?: string
}

export const tagsQueryKey = 'tags'
export const tagQueryKey = 'tag'
