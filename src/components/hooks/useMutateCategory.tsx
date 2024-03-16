import { useMutation, useQueryClient } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import { Role, type ResponseDataType } from '@/types/common'
import type { AxiosError } from 'axios'
import type { UseMutationResult } from 'react-query'

import axiosInstance from '@/config/axiosInstance'
import { Category, CategoryMutate, categoriesQueryKey, categoryQueryKey } from '@/types/category'
import { CategoryCreateInput } from '@/schema/category'

const updateCategory = async (formData: CategoryMutate): Promise<ResponseDataType & { data: Category | null }> => {
  const copyData = { ...formData }
  delete copyData.id
  const { data } = await axiosInstance.patch<Promise<ResponseDataType & { data: Category | null }>>(
    `/admin/categories/${formData.id}`,
    copyData
  )
  return data
}

export const useMutateCategoryUpdate = (): UseMutationResult<
  ResponseDataType & { data: Category | null },
  AxiosError,
  CategoryMutate,
  undefined
> => {
  const queryClient = useQueryClient()
  const admin = getAdminFromLocalStorage()

  return useMutation(updateCategory, {
    onSuccess: (res) => {
      queryClient.setQueryData([categoryQueryKey, res.data?.id], res.data)
      queryClient.refetchQueries([admin, categoriesQueryKey])
    }
  })
}

const createCategory = async (formData: CategoryCreateInput): Promise<ResponseDataType & { data: Category | null }> => {
  const { data } = await axiosInstance.post<ResponseDataType & { data: Category | null }>(`/admin/categories/`, formData)
  return data
}

export const useMutateCategoryCreate = (): UseMutationResult<
  ResponseDataType & { data: Category | null },
  AxiosError,
  CategoryCreateInput,
  undefined
> => {
  const admin = getAdminFromLocalStorage()
  const queryClient = useQueryClient()

  return useMutation(createCategory, {
    onSuccess() {
      queryClient.refetchQueries([admin, categoriesQueryKey])
    }
  })
}

const deleteCategory = async (id?: number): Promise<ResponseDataType & { data: Category | null }> => {
  const { data } = await axiosInstance.delete<ResponseDataType & { data: Category | null }>(`/admin/categories/${id}`)
  return data
}

export const useMutateCategoryDelete = (): UseMutationResult<
  ResponseDataType & { data: Category | null },
  AxiosError,
  number | undefined,
  undefined
> => {
  const admin = getAdminFromLocalStorage()

  const queryClient = useQueryClient()
  return useMutation(deleteCategory, {
    onSuccess() {
      queryClient.refetchQueries([admin, categoriesQueryKey])
    }
  })
}
