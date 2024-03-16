export type Category = {
  id: number;
  parentId: number;
  title: string;
  metaTitle: string;
  slug: string;
  image: string;
  content: string;
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type CategoriesSearchQuery = {
  page: number
  limit: number
  search: string
}

export type CategoriesResponseDataType = {
  data: Category[]
  totalCount: number
}

export type CategoryMutate = {
  id?: number;
  parentId?: number;
  title?: string;
  metaTitle?: string;
  slug?: string;
  image?: string;
  content?: string;
}

export const categoriesQueryKey = 'categories'
export const categoryQueryKey = 'category'
