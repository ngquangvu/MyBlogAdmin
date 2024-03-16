import type { ComponentPropsWithRef, FC } from 'react'

type Props = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  textboxProps: Omit<ComponentPropsWithRef<'input'>, 'id'>
}

export const SearchBox: FC<Props> = ({ onSubmit, textboxProps }) => {
  return (
    <>
      <form onSubmit={onSubmit} className="flex justify-end items-center">
        <input {...textboxProps} className="h-10 rounded-l-md border border-gray-200 px-3 py-2 text-sm" type="search" />
        <div>
          <button
            type="submit"
            className="hover:opacity-80 h-10 p-2.5 bg-gray-200 text-gray-400 group relative min-w-0 flex-1 overflow-hidden text-sm font-medium text-center focus:z-10 last:rounded-r-md"
          >
            <svg
              className="h-5 w-5 text-gray-700"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {' '}
              <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="10" cy="10" r="7" />{' '}
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
        </div>
      </form>
    </>
  )
}
