type PaginationParams = {
  currentPage: number
  totalCount: number
  limit: number
}

export const usePagination = ({ currentPage, totalCount, limit }: PaginationParams) => {
  let totalPages = Math.ceil(totalCount / limit)
  let startPage: number
  let endPage: number

  if (totalPages <= 10) {
    startPage = 1
    endPage = totalPages
  } else if (currentPage <= 6) {
    startPage = 1
    endPage = 10
  } else if (currentPage + 4 >= totalPages) {
    startPage = totalPages - 9
    endPage = totalPages
  } else {
    startPage = currentPage - 5
    endPage = currentPage + 4
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  if (totalPages === 0) {
    totalPages = 1
  }

  return {
    totalPages,
    pages
  }
}
