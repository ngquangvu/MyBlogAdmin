import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowPathIcon, TrashIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Loading } from '@/components/atoms/Loading/Loading'
import { SearchBox } from '@/components/molecules/SearchBox'
import { Pagination } from '@/components/organisms/Pagination'
import {
  useMutatePostCreate,
  useMutatePostUpdate,
  useMutatePostDelete,
  useMutatePostRestore
} from '@/components/hooks/useMutatePost'
import { Post } from '@/types/post'
import { useQueryPosts } from '@/components/hooks/useQueryPost'
import { postsSearchQueryState, postsSearchState, postsPageState } from '@/states/postsSearchQueryState'
import { NotificationType } from '@/types/common'
import { DeleteModal } from '@/components/organisms/DeleteModal'
import { NotificationBadge } from '@/components/organisms/NotificationBadge'
import { RestoreModal } from '@/components/organisms/RestoreModal'

export const Posts = () => {
  const postsQuery = useRecoilValue(postsSearchQueryState)
  const [searchState, setPostsSearch] = useRecoilState(postsSearchState)
  const { mutateAsync: deletePostMutateAsync } = useMutatePostDelete()
  const { mutateAsync: restorePostMutateAsync } = useMutatePostRestore()
  const { posts } = useQueryPosts(postsQuery)
  const [page, setPage] = useRecoilState(postsPageState)
  const navigate = useNavigate()

  // ========= Notification =========
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [notificationObj, setNotification] = useState<{
    type: NotificationType
    title: string
    message: string
  } | null>(null)

  // ========= Search =========
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>(searchState || '')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSearching(searchText !== '')

    setPostsSearch(searchText)
  }

  // ========= Delete =========
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string>('')

  const handleMutateDelete = () => {
    deletePostMutateAsync(deleteId).then(() => {
      setIsDeleteModalOpen(false)
    })
  }

  const handleOpenDeleteModal = (id: string) => {
    setDeleteId(id)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  // ========= Restore =========
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false)
  const [restoreId, setRestoreId] = useState<string>('')

  const handleMutateRestore = () => {
    restorePostMutateAsync(restoreId).then(() => {
      setIsRestoreModalOpen(false)
    })
  }

  const handleOpenRestoreModal = (id: string) => {
    setRestoreId(id)
    setIsRestoreModalOpen(true)
  }

  const handleConfirmRestoreModal = () => {
    setIsRestoreModalOpen(false)
  }

  const handleCancelRestoreModal = () => {
    setIsRestoreModalOpen(false)
  }

  return (
    <main>
      <div className="flex justify-between items-center pr-4 sm:pr-6 lg:pr-8 mb-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {isSearching ? 'Search post ' + searchState : 'All post '} ({posts?.data?.totalCount})
        </h2>
        <div className="flex h-10">
          <SearchBox
            onSubmit={handleSearch}
            textboxProps={{
              name: 'search',
              value: searchText,
              onChange: (e) => {
                setSearchText(e.target.value)
              }
            }}
          />
          <button
            type="button"
            onClick={async () => {
              // handleOpenCreateModal()
              navigate({ pathname: `${import.meta.env.VITE_ADMIN_ROUTE}/posts/create` })
            }}
            className="ml-3 block rounded-md bg-gray-200 dark:bg-gray-600 hover:opacity-80 px-3 py-2 text-center text-sm font-semibold text-gray-700  dark:text-white"
          >
            Create
          </button>
        </div>
      </div>
      <div className="mt-2 pb-9">
        <Suspense fallback={<Loading className="mt-20" />}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="table-data min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0"
                        >
                          #
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Author
                        </th>
                        <th
                          scope="col"
                          className="min-w-[150px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Title
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Slug
                        </th>
                        <th
                          scope="col"
                          className="min-w-[150px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Summary
                        </th>
                        <th
                          scope="col"
                          className="min-w-[250px] px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Content
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Thumbnail
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Published
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {posts?.data?.data.map((post_detail: Post) => (
                        <tr key={post_detail.id}>
                          <td className="py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">
                            <button
                              className="rounded px-2 py-1"
                              onClick={() => {
                                navigator.clipboard.writeText(post_detail.id)
                                setNotification({
                                  type: NotificationType.SUCCESS,
                                  title: 'Copied to clipboard',
                                  message: post_detail.id
                                })
                                setShowNotification(true)
                              }}
                            >
                              <ClipboardDocumentIcon className="w-5 h-5 text-gray-400" />
                            </button>
                          </td>
                          <td className="max-w-[100px] px-3 py-4 text-sm text-gray-500 dark:text-white">{post_detail.authorId}</td>
                          <td className="max-w-[100px] px-3 py-4 text-sm text-gray-500 dark:text-white"><p className='line-clamp-4'>{post_detail.title}</p></td>
                          <td className="max-w-[100px] px-3 py-4 text-sm text-gray-500 dark:text-white">{post_detail.slug}</td>
                          <td className="max-w-[100px] px-3 py-4 text-sm text-gray-500 dark:text-white"><p className='line-clamp-4'>{post_detail.summary}</p></td>
                          <td className="max-w-[300px] px-3 py-4 text-sm text-gray-500 dark:text-white"><div className='line-clamp-4' dangerouslySetInnerHTML={{__html: post_detail.content}}></div></td>
                          <td className="max-w-[100px] px-3 py-4 text-sm text-gray-500 dark:text-white">
                            <img className="w-40 h-auto" src={post_detail.thumbnail} alt={post_detail.thumbnail} />
                          </td>
                          <td className="text-center px-3 py-4 text-sm text-gray-500 dark:text-white">
                            {post_detail.published ? '⚪︎' : ''}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              onClick={() => {
                                navigate({ pathname: `${import.meta.env.VITE_ADMIN_ROUTE}/posts/edit/` + post_detail.id })
                              }}
                              className="text-gray-600 dark:text-white hover:opacity-80"
                            >
                              Edit<span className="sr-only">, {post_detail.id}</span>
                            </button>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-8 pr-8 text-center text-sm font-medium sm:pr-0">
                            {post_detail.deletedAt ? (
                              <button
                                onClick={async () => {
                                  handleOpenRestoreModal(post_detail.id)
                                }}
                                className="w-5 h-5 text-blue-700 hover:opacity-80"
                              >
                                <ArrowPathIcon className="w-5 h-5" />
                              </button>
                            ) : (
                              <button
                                onClick={async () => {
                                  handleOpenDeleteModal(post_detail.id)
                                }}
                                className="w-5 h-5 text-red-700 hover:opacity-80"
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {isDeleteModalOpen && (
                    <DeleteModal
                      title="Delete Post"
                      body="Are you sure you want to delete this post?"
                      actionDelete={handleMutateDelete}
                      onConfirm={handleConfirmDeleteModal}
                      onCancel={handleCancelDeleteModal}
                    />
                  )}
                  {isRestoreModalOpen && (
                    <RestoreModal
                      title="Restore Post"
                      body="Are you sure you want to restore this post?"
                      actionRestore={handleMutateRestore}
                      onConfirm={handleConfirmRestoreModal}
                      onCancel={handleCancelRestoreModal}
                    />
                  )}
                </div>
              </div>
              {posts?.data?.totalCount && posts?.data?.totalCount > 0 ? (
                <div className="flex justify-end mt-5">
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalCount={posts?.data?.totalCount}
                    limit={import.meta.env.VITE_PAGINATION_LIMIT}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </Suspense>
      </div>
      <NotificationBadge
        show={showNotification}
        setShow={setShowNotification}
        type={notificationObj?.type}
        text={notificationObj?.title}
        message={notificationObj?.message}
      />
    </main>
  )
}
