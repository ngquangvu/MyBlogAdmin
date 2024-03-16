import { TagsSearchQuery } from '@/types/tag'
import { atom, selector } from 'recoil'


export const tagsSearchState = atom<string>({
  key: 'tagsSearchState',
  default: ''
})

export const tagsLimitState = atom<number>({
  key: 'tagsLimitState',
  default: import.meta.env.VITE_PAGINATION_LIMIT
})

export const tagsPageState = atom<number>({
  key: 'tagsPageState',
  default: 1
})

export const tagsSearchQueryState = selector<TagsSearchQuery>({
  key: 'tagsSearchQuery',
  get: ({ get }) => {
    const page = get(tagsPageState)
    const search = get(tagsSearchState)
    const limit = get(tagsLimitState)

    return {
      page,
      search,
      limit
    }
  }
})
