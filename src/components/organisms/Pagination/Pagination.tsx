import type { FC } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import { usePagination } from '@/components/hooks/usePagination'

type Props = {
  setPage: (page: number) => void
  page: number
  totalCount?: number
  limit?: number
}

export const Pagination: FC<Props> = ({ setPage, page: currentPage, totalCount = 0, limit = 10 }) => {
  const { totalPages, pages } = usePagination({ currentPage, totalCount, limit })

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 flex justify-between items-center sm:hidden">
        <button
          onClick={() => setPage(currentPage - 1)}
          type="button"
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-200"
        >
          Previous
        </button>
        <div className="text-sm text-gray-700">
          <div>
            <span className="font-medium">{currentPage}</span> / <span className="font-medium">{totalPages}</span> of{' '}
            <span className="font-medium">{totalCount}</span> projects
          </div>
          <span className="font-medium">{totalPages > 1 ? 'ページ' : 'ページ'}</span>
        </div>
        <button
          onClick={() => setPage(currentPage + 1)}
          type="button"
          disabled={currentPage === totalPages || totalPages === 0}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between flex-wrap">
        <div>
          <nav className="relative z-0 inline-flex rounded-md -space-x-px" aria-label="Pagination">
            <button
              onClick={() => setPage(currentPage - 1)}
              type="button"
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setPage(page)}
                type="button"
                aria-current="page"
                className={`${
                  page === currentPage
                    ? 'z-10 bg-gray-100 border-gray-200 text-gray-400 hover:cursor-auto'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }  relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setPage(currentPage + 1)}
              type="button"
              disabled={currentPage === totalPages || totalPages === 0}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
