import { Post } from "../post"

export type Subscriber = {
  id: string
  email: string
  isActive: string
  isAgree: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type SubscribersSearchQuery = {
  page: number
  limit: number
  search: string
}

export type SubscribersResponseDataType = {
  data: Subscriber[]
  totalCount: number
}

export type SubscriberMutate = {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

export const subscribersQueryKey = 'subscribers'
export const subscriberQueryKey = 'subscriber'
