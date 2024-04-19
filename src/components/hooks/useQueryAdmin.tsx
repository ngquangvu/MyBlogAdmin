import { useQuery } from 'react-query'

import type { Admin } from '@/types/admin'
import type { ResponseDataType } from '@/types/common'

import { setToLocalStorage } from '@/components/hooks/useQueryUser'
import axiosInstance from '@/config/axiosInstance'
import { adminsQueryKey, type AdminsSearchQuery, type AdminsResponseDataType, adminQueryKey } from '@/types/admin'
import { User, userQueryKey } from '@/types/user'

export const setAdminToLocalStorage = (admin: Admin | null) => {
  setToLocalStorage('admin', `${admin?.email}`)
  setToLocalStorage('admin_id', `${admin?.id}`)
}

export const removeAdminFromLocalStorage = () => {
  localStorage.removeItem('admin')
  localStorage.removeItem('admin_id')
}

export const getAdminFromLocalStorage = (): string | null => {
  const admin = localStorage.getItem('admin')

  if (admin) {
    try {
      return admin
    } catch (error) {
      return null
    }
  }

  return null
}

export const getAdmins = async (
  params: AdminsSearchQuery
): Promise<ResponseDataType & { data: AdminsResponseDataType | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: AdminsResponseDataType | null }>(
    `/admin/admins`,
    {
      params
    }
  )
  return data
}

export const useQueryAdmins = (params: AdminsSearchQuery) => {
  const { data: admins, refetch } = useQuery([adminsQueryKey, params.page, params.search], () => getAdmins(params), {
    keepPreviousData: true
  })

  return { admins, refetch }
}

export const getAdminDetail = async (adminId: string): Promise<ResponseDataType & { data: Admin | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: Admin | null }>(`/admin/admins/${adminId}`)

  return data
}

export const useQueryAdminDetail = (adminId: string) => {
  const { data: adminDetail, remove } = useQuery([adminQueryKey, adminId], () => getAdminDetail(adminId))

  return { adminDetail, remove }
}

const getAdminUserDetail = async (): Promise<ResponseDataType & { data: User | null }> => {
  const adminEmail = getAdminFromLocalStorage()
  const { data } = await axiosInstance.get<ResponseDataType & { data: User | null }>(`/admin/admins/user/${adminEmail}`)

  return data
}

export const useQueryAdminUserDetail = () => {
  const { data: adminUserDetail, refetch } = useQuery([userQueryKey], () => getAdminUserDetail())

  return { adminUserDetail, refetch }
}
