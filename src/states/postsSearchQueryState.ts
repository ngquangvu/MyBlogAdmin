import { PostsSearchQuery } from '@/types/post'
import { atom, selector } from 'recoil'


export const postsSearchState = atom<string>({
  key: 'postsSearchState',
  default: ''
})

export const postsLimitState = atom<number>({
  key: 'postsLimitState',
  default: import.meta.env.VITE_PAGINATION_LIMIT
})

export const postsPageState = atom<number>({
  key: 'postsPageState',
  default: 1
})

export const postsSearchQueryState = selector<PostsSearchQuery>({
  key: 'postsSearchQuery',
  get: ({ get }) => {
    const page = get(postsPageState)
    const search = get(postsSearchState)
    const limit = get(postsLimitState)

    return {
      page,
      search,
      limit
    }
  }
})
