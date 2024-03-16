import { atom, selector } from 'recoil'

import type { UsersSearchQuery } from '@/types/user'

export const usersSearchState = atom<string>({
  key: 'usersSearchState',
  default: ''
})

export const usersLimitState = atom<number>({
  key: 'usersLimitState',
  default: import.meta.env.VITE_PAGINATION_LIMIT
})

export const usersPageState = atom<number>({
  key: 'usersPageState',
  default: 1
})

export const usersSearchQueryState = selector<UsersSearchQuery>({
  key: 'usersSearchQuery',
  get: ({ get }) => {
    const page = get(usersPageState)
    const search = get(usersSearchState)
    const limit = get(usersLimitState)

    return {
      page,
      search,
      limit
    }
  }
})
