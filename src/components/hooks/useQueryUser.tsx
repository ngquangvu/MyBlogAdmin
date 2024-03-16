import { useQuery } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import type { ResponseDataType } from '@/types/common'
import type { User, UsersResponseDataType, UsersSearchQuery } from '@/types/user'

import axiosInstance from '@/config/axiosInstance'
import { userQueryKey, usersQueryKey } from '@/types/user'

const isQuotaExceeded = (e: unknown) => {
  let quotaExceeded = false
  if (e instanceof DOMException) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true
          break
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true
          }
          break
      }
    }
  }
  return quotaExceeded
}

export const setToLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    if (isQuotaExceeded(e)) {
      // Storage full, maybe notify user or do some clean-up
      console.error('Storage is not available')
    }
  }
}

const getUsers = async (
  params: UsersSearchQuery
): Promise<ResponseDataType & { data: UsersResponseDataType | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: UsersResponseDataType | null }>(`/admin/users`, {
    params
  })

  return data
}

export const useQueryUsers = (params: UsersSearchQuery) => {
  const admin = getAdminFromLocalStorage()

  const { data: users, refetch } = useQuery(
    [admin, usersQueryKey, params.page, params.search],
    () => getUsers(params),
    {
      keepPreviousData: true
    }
  )

  return { users, refetch }
}

const getUserDetail = async (id: string): Promise<ResponseDataType & { data: User | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: User | null }>(`/admin/users/${id}`)

  return data
}

export const useQueryUserDetail = (id: string) => {
  const { data: userDetail, refetch } = useQuery([userQueryKey, id], () => getUserDetail(id))

  return { userDetail, refetch }
}
