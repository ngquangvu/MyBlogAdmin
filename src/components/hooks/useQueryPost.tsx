import { useQuery } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import type { ResponseDataType } from '@/types/common'

import axiosInstance from '@/config/axiosInstance'
import { Post } from '@/types/user'
import { PostsSearchQuery, PostsResponseDataType, postsQueryKey, postQueryKey } from '@/types/post'

const getPosts = async (
  params: PostsSearchQuery
): Promise<ResponseDataType & { data: PostsResponseDataType | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: PostsResponseDataType | null }>(`/admin/posts`, {
    params
  })

  return data
}

export const useQueryPosts = (params: PostsSearchQuery) => {
  const admin = getAdminFromLocalStorage()

  const { data: posts, refetch } = useQuery(
    [admin, postsQueryKey, params.page, params.search],
    () => getPosts(params),
    {
      keepPreviousData: true
    }
  )

  return { posts, refetch }
}

const getPostDetail = async (id: string): Promise<ResponseDataType & { data: Post | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: Post | null }>(`/admin/posts/${id}`)

  return data
}

export const useQueryPostDetail = (id: string) => {
  const { data: postDetail, refetch } = useQuery([postQueryKey, id], () => getPostDetail(id))

  return { postDetail, refetch }
}
