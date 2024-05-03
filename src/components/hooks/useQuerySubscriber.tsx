import { useQuery } from 'react-query'

import { getAdminFromLocalStorage } from './useQueryAdmin'

import type { ResponseDataType } from '@/types/common'

import axiosInstance from '@/config/axiosInstance'
import { Subscriber, SubscribersResponseDataType, SubscribersSearchQuery, subscriberQueryKey, subscribersQueryKey } from '@/types/subscriber'

const getSubscribers = async (
  params: SubscribersSearchQuery
): Promise<ResponseDataType & { data: SubscribersResponseDataType | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: SubscribersResponseDataType | null }>(`/admin/subscribers`, {
    params
  })

  return data
}

export const useQuerySubscribers = (params: SubscribersSearchQuery) => {
  const admin = getAdminFromLocalStorage()

  const { data: subscribers, refetch } = useQuery(
    [admin, subscribersQueryKey, params.page, params.search],
    () => getSubscribers(params),
    {
      keepPreviousData: true
    }
  )

  return { subscribers, refetch }
}

const getAllSubscribers = async (
): Promise<ResponseDataType & { data: SubscribersResponseDataType | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: SubscribersResponseDataType | null }>(`/admin/subscribers/all`)
  return data
}

export const useQueryAllSubscribers = () => {
  const admin = getAdminFromLocalStorage()

  const { data: subscribers, refetch } = useQuery(
    [admin, subscribersQueryKey],
    () => getAllSubscribers(),
    {
      keepPreviousData: true
    }
  )

  return { subscribers, refetch }
}

const getSubscriberDetail = async (id: string): Promise<ResponseDataType & { data: Subscriber | null }> => {
  const { data } = await axiosInstance.get<ResponseDataType & { data: Subscriber | null }>(`/admin/subscribers/${id}`)

  return data
}

export const useQuerySubscriberDetail = (id: string) => {
  const { data: subscriberDetail, refetch } = useQuery([subscriberQueryKey, id], () => getSubscriberDetail(id))

  return { subscriberDetail, refetch }
}
