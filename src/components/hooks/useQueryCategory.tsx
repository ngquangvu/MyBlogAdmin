import { useQuery } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import type { ResponseDataType } from '@/types/common'

import axiosInstance from '@/config/axiosInstance'
import { CategoriesSearchQuery, CategoriesResponseDataType, categoriesQueryKey, Category, categoryQueryKey } from '@/types/category'

const getCategories = async (
  params: CategoriesSearchQuery
): Promise<ResponseDataType & { data: CategoriesResponseDataType | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: CategoriesResponseDataType | null }>(`/admin/categories`, {
    params
  })

  return data
}

export const useQueryCategories = (params: CategoriesSearchQuery) => {
  const admin = getAdminFromLocalStorage()

  const { data: categories, refetch } = useQuery(
    [admin, categoriesQueryKey, params.page, params.search],
    () => getCategories(params),
    {
      keepPreviousData: true
    }
  )

  return { categories, refetch }
}

const getCategoryDetail = async (id: string): Promise<ResponseDataType & { data: Category | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: Category | null }>(`/admin/categories/${id}`)

  return data
}

export const useQueryCategoryDetail = (id: string) => {
  const { data: categoryDetail, refetch } = useQuery([categoryQueryKey, id], () => getCategoryDetail(id))

  return { categoryDetail, refetch }
}
