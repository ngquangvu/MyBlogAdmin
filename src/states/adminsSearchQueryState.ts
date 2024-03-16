import { atom, selector } from 'recoil'

import type { AdminsSearchQuery } from '@/types/admin'

export const adminsSearchState = atom<string>({
  key: 'adminsSearchState',
  default: ''
})

export const adminsLimitState = atom<number>({
  key: 'adminsLimitState',
  default: import.meta.env.VITE_PAGINATION_LIMIT
})

export const adminsPageState = atom<number>({
  key: 'adminsPageState',
  default: 1
})

export const adminsSearchQueryState = selector<AdminsSearchQuery>({
  key: 'adminsSearchQuery',
  get: ({ get }) => {
    const page = get(adminsPageState)
    const search = get(adminsSearchState)
    const limit = get(adminsLimitState)

    return {
      page,
      search,
      limit
    }
  }
})
