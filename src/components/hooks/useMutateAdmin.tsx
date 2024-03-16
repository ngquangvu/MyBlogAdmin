import { useMutation, useQueryClient } from 'react-query'

import { removeAdminFromLocalStorage, setAdminToLocalStorage } from './useQueryAdmin'

import type { Admin } from '@/types/admin'
import type { ResponseDataType } from '@/types/common'
import type { LoginInput } from '@/types/login'
import type { AxiosError } from 'axios'
import type { UseMutationResult } from 'react-query'

import axiosInstance from '@/config/axiosInstance'
import { adminQueryKey } from '@/types/admin'

const login = async (formData: LoginInput) => {
  const { data } = await axiosInstance.post<ResponseDataType & { data: Admin | null }>(
    `/admin/authentication/login`,
    formData
  )
  return data
}

export const useMutateLogin = (): UseMutationResult<
  ResponseDataType & { data: Admin | null },
  AxiosError,
  LoginInput,
  undefined
> => {
  const queryClient = useQueryClient()

  return useMutation(login, {
    onSuccess: (res) => {
      if (res.data) {
        queryClient.removeQueries([])
        setAdminToLocalStorage(res.data)
        queryClient.setQueryData(adminQueryKey, res.data)
      }
    }
  })
}

const logout = async () => {
  const { data } = await axiosInstance.post<ResponseDataType & { data: Admin | null }>(`/admin/authentication/logout`)

  return data
}

export const useMutateLogout = (): UseMutationResult<ResponseDataType & { data: Admin | null }, AxiosError> => {
  const queryClient = useQueryClient()

  return useMutation(logout, {
    onMutate: () => {
      removeAdminFromLocalStorage()
      queryClient.removeQueries([])
    }
  })
}
