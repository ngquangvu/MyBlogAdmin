import { useMutation, useQueryClient } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import { Role, type ResponseDataType } from '@/types/common'
import type { AxiosError } from 'axios'
import type { UseMutationResult } from 'react-query'

import axiosInstance from '@/config/axiosInstance'
import { PostCreateInput } from '@/schema/post'
import { Post, PostMutate, postQueryKey, postsQueryKey } from '@/types/post'

const updatePost = async (formData: PostMutate): Promise<ResponseDataType & { data: Post | null }> => {
  const copyData = { ...formData }
  delete copyData.id
  const { data } = await axiosInstance.patch<Promise<ResponseDataType & { data: Post | null }>>(
    `/admin/posts/${formData.id}`,
    copyData
  )
  return data
}

export const useMutatePostUpdate = (): UseMutationResult<
  ResponseDataType & { data: Post | null },
  AxiosError,
  PostMutate,
  undefined
> => {
  const queryClient = useQueryClient()
  const admin = getAdminFromLocalStorage()

  return useMutation(updatePost, {
    onSuccess: (res) => {
      queryClient.setQueryData([postQueryKey, res.data?.id], res.data)
      queryClient.refetchQueries([admin, postsQueryKey])
    }
  })
}

const createPost = async (formData: PostCreateInput): Promise<ResponseDataType & { data: Post | null }> => {
  const { data } = await axiosInstance.post<ResponseDataType & { data: Post | null }>(`/admin/posts/`, formData)
  return data
}

export const useMutatePostCreate = (): UseMutationResult<
  ResponseDataType & { data: Post | null },
  AxiosError,
  PostCreateInput,
  undefined
> => {
  const admin = getAdminFromLocalStorage()
  const queryClient = useQueryClient()

  return useMutation(createPost, {
    onSuccess() {
      queryClient.refetchQueries([admin, postsQueryKey])
    }
  })
}

const deletePost = async (id?: string): Promise<ResponseDataType & { data: Post | null }> => {
  const { data } = await axiosInstance.delete<ResponseDataType & { data: Post | null }>(`/admin/posts/${id}`)
  return data
}

export const useMutatePostDelete = (): UseMutationResult<
  ResponseDataType & { data: Post | null },
  AxiosError,
  string | undefined,
  undefined
> => {
  const admin = getAdminFromLocalStorage()

  const queryClient = useQueryClient()
  return useMutation(deletePost, {
    onSuccess() {
      queryClient.refetchQueries([admin, postsQueryKey])
    }
  })
}

const restorePost = async (id?: string): Promise<ResponseDataType & { data: Post | null }> => {
  const { data } = await axiosInstance.patch<ResponseDataType & { data: Post | null }>(`/admin/posts/restore/${id}`)
  return data
}

export const useMutatePostRestore = (): UseMutationResult<
  ResponseDataType & { data: Post | null },
  AxiosError,
  string | undefined,
  undefined
> => {
  const admin = getAdminFromLocalStorage()

  const queryClient = useQueryClient()
  return useMutation(restorePost, {
    onSuccess() {
      queryClient.refetchQueries([admin, postsQueryKey])
    }
  })
}
