import { useMutation, useQueryClient } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import type { UserCreateInput } from '@/schema/user'
import { Role, type ResponseDataType } from '@/types/common'
import type { UserMutate } from '@/types/user'
import type { AxiosError } from 'axios'
import type { UseMutationResult } from 'react-query'

import axiosInstance from '@/config/axiosInstance'
import { userQueryKey, type User, usersQueryKey } from '@/types/user'

const updateUser = async (formData: UserMutate): Promise<ResponseDataType & { data: User | null }> => {
  const copyData = { ...formData }
  delete copyData.id
  const { data } = await axiosInstance.patch<Promise<ResponseDataType & { data: User | null }>>(
    `/admin/users/${formData.id}`,
    copyData
  )
  return data
}

export const useMutateUserUpdate = (): UseMutationResult<
  ResponseDataType & { data: User | null },
  AxiosError,
  UserMutate,
  undefined
> => {
  const queryClient = useQueryClient()
  const admin = getAdminFromLocalStorage()

  return useMutation(updateUser, {
    onSuccess: (res) => {
      queryClient.setQueryData([userQueryKey, res.data?.id], res.data)
      queryClient.refetchQueries([admin, usersQueryKey])
    }
  })
}

const createUser = async (formData: UserCreateInput): Promise<ResponseDataType & { data: User | null }> => {
  const copyData = { ...formData, role: Role.USER }
  delete copyData.confirmPassword
  const { data } = await axiosInstance.post<ResponseDataType & { data: User | null }>(`/admin/users/`, copyData)
  return data
}

export const useMutateUserCreate = (): UseMutationResult<
  ResponseDataType & { data: User | null },
  AxiosError,
  UserCreateInput,
  undefined
> => {
  const admin = getAdminFromLocalStorage()
  const queryClient = useQueryClient()

  return useMutation(createUser, {
    onSuccess() {
      queryClient.refetchQueries([admin, usersQueryKey])
    }
  })
}

const deleteUser = async (id?: number): Promise<ResponseDataType & { data: User | null }> => {
  const { data } = await axiosInstance.delete<ResponseDataType & { data: User | null }>(`/admin/users/${id}`)
  return data
}

export const useMutateUserDelete = (): UseMutationResult<
  ResponseDataType & { data: User | null },
  AxiosError,
  number | undefined,
  undefined
> => {
  const admin = getAdminFromLocalStorage()

  const queryClient = useQueryClient()
  return useMutation(deleteUser, {
    onSuccess() {
      queryClient.refetchQueries([admin, usersQueryKey])
    }
  })
}

const restoreUser = async (id?: number): Promise<ResponseDataType & { data: User | null }> => {
  const { data } = await axiosInstance.patch<ResponseDataType & { data: User | null }>(`/admin/users/restore/${id}`)
  return data
}

export const useMutateUserRestore = (): UseMutationResult<
  ResponseDataType & { data: User | null },
  AxiosError,
  number | undefined,
  undefined
> => {
  const admin = getAdminFromLocalStorage()

  const queryClient = useQueryClient()
  return useMutation(restoreUser, {
    onSuccess() {
      queryClient.refetchQueries([admin, usersQueryKey])
    }
  })
}

