import { CategoriesSearchQuery } from '@/types/category'
import { atom, selector } from 'recoil'


export const categoriesSearchState = atom<string>({
  key: 'categoriesSearchState',
  default: ''
})

export const categoriesLimitState = atom<number>({
  key: 'categoriesLimitState',
  default: import.meta.env.VITE_PAGINATION_LIMIT
})

export const categoriesPageState = atom<number>({
  key: 'categoriesPageState',
  default: 1
})

export const categoriesSearchQueryState = selector<CategoriesSearchQuery>({
  key: 'categoriesSearchQuery',
  get: ({ get }) => {
    const page = get(categoriesPageState)
    const search = get(categoriesSearchState)
    const limit = get(categoriesLimitState)

    return {
      page,
      search,
      limit
    }
  }
})
