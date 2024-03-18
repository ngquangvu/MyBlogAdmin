import { Post } from "../post"

export type User = {
  id: string
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
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

export const usersQueryKey = 'users'
export const userQueryKey = 'user'
