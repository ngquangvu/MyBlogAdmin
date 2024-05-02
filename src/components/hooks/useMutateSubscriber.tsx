import { useMutation, useQueryClient } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import type { SubscriberCreateInput } from '@/schema/subscriber'
import { type ResponseDataType } from '@/types/common'
import type { SubscriberMutate } from '@/types/subscriber'
import type { AxiosError } from 'axios'
import type { UseMutationResult } from 'react-query'

import axiosInstance from '@/config/axiosInstance'
import { subscriberQueryKey, type Subscriber, subscribersQueryKey } from '@/types/subscriber'

const updateSubscriber = async (formData: SubscriberMutate): Promise<ResponseDataType & { data: Subscriber | null }> => {
  const copyData = { ...formData }
  delete copyData.id
  const { data } = await axiosInstance.patch<Promise<ResponseDataType & { data: Subscriber | null }>>(
    `/admin/subscribers/${formData.id}`,
    copyData
  )
  return data
}

export const useMutateSubscriberUpdate = (): UseMutationResult<
  ResponseDataType & { data: Subscriber | null },
  AxiosError,
  SubscriberMutate,
  undefined
> => {
  const queryClient = useQueryClient()
  const admin = getAdminFromLocalStorage()

  return useMutation(updateSubscriber, {
    onSuccess: (res) => {
      queryClient.setQueryData([subscriberQueryKey, res.data?.id], res.data)
      queryClient.refetchQueries([admin, subscribersQueryKey])
    }
  })
}

const createSubscriber = async (formData: SubscriberCreateInput): Promise<ResponseDataType & { data: Subscriber | null }> => {
  const copyData = { ...formData }
  const { data } = await axiosInstance.post<ResponseDataType & { data: Subscriber | null }>(`/admin/subscribers/`, copyData)
  return data
}

export const useMutateSubscriberCreate = (): UseMutationResult<
  ResponseDataType & { data: Subscriber | null },
  AxiosError,
  SubscriberCreateInput,
  undefined
> => {
  const admin = getAdminFromLocalStorage()
  const queryClient = useQueryClient()

  return useMutation(createSubscriber, {
    onSuccess() {
      queryClient.refetchQueries([admin, subscribersQueryKey])
    }
  })
}

const deleteSubscriber = async (id?: string): Promise<ResponseDataType & { data: Subscriber | null }> => {
  const { data } = await axiosInstance.delete<ResponseDataType & { data: Subscriber | null }>(`/admin/subscribers/${id}`)
  return data
}

export const useMutateSubscriberDelete = (): UseMutationResult<
  ResponseDataType & { data: Subscriber | null },
  AxiosError,
  string | undefined,
  undefined
> => {
  const admin = getAdminFromLocalStorage()

  const queryClient = useQueryClient()
  return useMutation(deleteSubscriber, {
    onSuccess() {
      queryClient.refetchQueries([admin, subscribersQueryKey])
    }
  })
}

const restoreSubscriber = async (id?: string): Promise<ResponseDataType & { data: Subscriber | null }> => {
  const { data } = await axiosInstance.patch<ResponseDataType & { data: Subscriber | null }>(`/admin/subscribers/restore/${id}`)
  return data
}

export const useMutateSubscriberRestore = (): UseMutationResult<
  ResponseDataType & { data: Subscriber | null },
  AxiosError,
  string | undefined,
  undefined
> => {
  const admin = getAdminFromLocalStorage()

  const queryClient = useQueryClient()
  return useMutation(restoreSubscriber, {
    onSuccess() {
      queryClient.refetchQueries([admin, subscribersQueryKey])
    }
  })
}

