import type { FC } from 'react'
import { memo } from 'react'

type Props = {
  category: string
  counter: number
  onClick: () => void
}

export const CategoryCounter: FC<Props> = memo(({ category, counter, onClick }) => {
  return (
    <button
      className="cursor-pointer flex items-center rounded-md bg-gray-100 dark:bg-gray-600 font-medium space-x-1 -mt-1"
      onClick={onClick}
    >
      <span className="text-gray-500 py-1 px-2.5 rounded-l-md bg-gray-200 dark:bg-gray-400">{counter}</span>
      <span className="px-1 pr-2.5 first-letter:uppercase">{category}</span>
    </button>
  )
})
