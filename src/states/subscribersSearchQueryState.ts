import { SubscribersSearchQuery } from '@/types/subscriber'
import { atom, selector } from 'recoil'

export const subscribersSearchState = atom<string>({
  key: 'subscribersSearchState',
  default: ''
})

export const subscribersLimitState = atom<number>({
  key: 'subscribersLimitState',
  default: import.meta.env.VITE_PAGINATION_LIMIT
})

export const subscribersPageState = atom<number>({
  key: 'subscribersPageState',
  default: 1
})

export const subscribersSearchQueryState = selector<SubscribersSearchQuery>({
  key: 'subscribersSearchQuery',
  get: ({ get }) => {
    const page = get(subscribersPageState)
    const search = get(subscribersSearchState)
    const limit = get(subscribersLimitState)

    return {
      page,
      search,
      limit
    }
  }
})
