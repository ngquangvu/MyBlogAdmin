import { useMutation, useQueryClient } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import { Role, type ResponseDataType } from '@/types/common'
import type { AxiosError } from 'axios'
import type { UseMutationResult } from 'react-query'

import axiosInstance from '@/config/axiosInstance'
import { Tag, TagMutate, tagQueryKey, tagsQueryKey } from '@/types/tag'
import { TagCreateInput } from '@/schema/tag'

const updateTag = async (formData: TagMutate): Promise<ResponseDataType & { data: Tag | null }> => {
  const copyData = { ...formData }
  delete copyData.id
  const { data } = await axiosInstance.patch<Promise<ResponseDataType & { data: Tag | null }>>(
    `/admin/tags/${formData.id}`,
    copyData
  )
  return data
}

export const useMutateTagUpdate = (): UseMutationResult<
  ResponseDataType & { data: Tag | null },
  AxiosError,
  TagMutate,
  undefined
> => {
  const queryClient = useQueryClient()
  const admin = getAdminFromLocalStorage()

  return useMutation(updateTag, {
    onSuccess: (res) => {
      queryClient.setQueryData([tagQueryKey, res.data?.id], res.data)
      queryClient.refetchQueries([admin, tagsQueryKey])
    }
  })
}

const createTag = async (formData: TagCreateInput): Promise<ResponseDataType & { data: Tag | null }> => {
  const { data } = await axiosInstance.post<ResponseDataType & { data: Tag | null }>(`/admin/tags/`, formData)
  return data
}

export const useMutateTagCreate = (): UseMutationResult<
  ResponseDataType & { data: Tag | null },
  AxiosError,
  TagCreateInput,
  undefined
> => {
  const admin = getAdminFromLocalStorage()
  const queryClient = useQueryClient()

  return useMutation(createTag, {
    onSuccess() {
      queryClient.refetchQueries([admin, tagsQueryKey])
    }
  })
}

const deleteTag = async (id?: number): Promise<ResponseDataType & { data: Tag | null }> => {
  const { data } = await axiosInstance.delete<ResponseDataType & { data: Tag | null }>(`/admin/tags/${id}`)
  return data
}

export const useMutateTagDelete = (): UseMutationResult<
  ResponseDataType & { data: Tag | null },
  AxiosError,
  number | undefined,
  undefined
> => {
  const admin = getAdminFromLocalStorage()

  const queryClient = useQueryClient()
  return useMutation(deleteTag, {
    onSuccess() {
      queryClient.refetchQueries([admin, tagsQueryKey])
    }
  })
}

const restoreTag = async (id?: number): Promise<ResponseDataType & { data: Tag | null }> => {
  const { data } = await axiosInstance.patch<ResponseDataType & { data: Tag | null }>(`/admin/tags/restore/${id}`)
  return data
}

export const useMutateTagRestore = (): UseMutationResult<
  ResponseDataType & { data: Tag | null },
  AxiosError,
  number | undefined,
  undefined
> => {
  const admin = getAdminFromLocalStorage()

  const queryClient = useQueryClient()
  return useMutation(restoreTag, {
    onSuccess() {
      queryClient.refetchQueries([admin, tagsQueryKey])
    }
  })
}

