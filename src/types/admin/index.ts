export type Admin = {
  id: number
  email: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type AdminResponseDataType = Pick<Admin, 'id' | 'email'>

export type AdminsResponseDataType = {
  data: Admin[]
  totalCount: number
}

export type AdminMutate = {
  id?: number
  email?: string
  password?: string
  newPassword?: string
}

export const adminsQueryKey = 'admins'
export const adminQueryKey = 'admin'

export type AdminsSearchQuery = {
  page: number
  limit: number
  search: string
}
