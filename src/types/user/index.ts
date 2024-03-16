export type Post = {
  id: string
}

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  posts: Post[]
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type UsersSearchQuery = {
  page: number
  limit: number
  search: string
}

export type UsersResponseDataType = {
  data: User[]
  totalCount: number
}

export type UserMutate = {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

export const usersQueryKey = 'users'
export const userQueryKey = 'user'
