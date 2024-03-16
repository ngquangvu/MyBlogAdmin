import { useQuery } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import type { ResponseDataType } from '@/types/common'

import axiosInstance from '@/config/axiosInstance'
import { Tag, TagsResponseDataType, TagsSearchQuery, tagQueryKey, tagsQueryKey } from '@/types/tag'

const getTags = async (
  params: TagsSearchQuery
): Promise<ResponseDataType & { data: TagsResponseDataType | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: TagsResponseDataType | null }>(`/admin/tags`, {
    params
  })

  return data
}

export const useQueryTags = (params: TagsSearchQuery) => {
  const admin = getAdminFromLocalStorage()

  const { data: tags, refetch } = useQuery(
    [admin, tagsQueryKey, params.page, params.search],
    () => getTags(params),
    {
      keepPreviousData: true
    }
  )

  return { tags, refetch }
}

const getTagDetail = async (id: string): Promise<ResponseDataType & { data: Tag | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: Tag | null }>(`/admin/tags/${id}`)

  return data
}

export const useQueryTagDetail = (id: string) => {
  const { data: tagDetail, refetch } = useQuery([tagQueryKey, id], () => getTagDetail(id))

  return { tagDetail, refetch }
}
