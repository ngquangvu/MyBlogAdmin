import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Loading } from '@/components/atoms/Loading/Loading'
import { SearchBox } from '@/components/molecules/SearchBox'
import { Pagination } from '@/components/organisms/Pagination'
import { useQueryTags } from '@/components/hooks/useQueryTag'
import { tagsPageState, tagsSearchQueryState, tagsSearchState } from '@/states'
import { TagCreateInput, TagDetailInput } from '@/schema/tag'
import { useMutateTagCreate, useMutateTagDelete, useMutateTagRestore, useMutateTagUpdate } from '@/components/hooks/useMutateTag'
import { Tag, TagMutate } from '@/types/tag'
import { CategoryCounter } from '@/components/organisms/CategoryCounter'
import { DeleteModal } from '@/components/organisms/DeleteModal'
import { RestoreModal } from '@/components/organisms/RestoreModal'
import CreateTagModal from '@/components/organisms/Tag/CreateTagModal/CreateTagModal'
import EditTagModal from '@/components/organisms/Tag/EditTagModal/EditTagModal'

export const Tags = () => {
  const tagsQuery = useRecoilValue(tagsSearchQueryState)
  const [searchState, setTagsSearch] = useRecoilState(tagsSearchState)
  const { mutateAsync: addTagMutateAsync } = useMutateTagCreate()
  const { mutateAsync: updateTagMutateAsync } = useMutateTagUpdate()
  const { mutateAsync: deleteTagMutateAsync } = useMutateTagDelete()
  const { mutateAsync: restoreTagMutateAsync } = useMutateTagRestore()
  const { tags } = useQueryTags(tagsQuery)
  const [page, setPage] = useRecoilState(tagsPageState)

  const navigate = useNavigate()

  // ========= Search =========
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>(searchState || '')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSearching(searchText !== '')

    setTagsSearch(searchText)
  }

  // ========= Create =========
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [errorMessageCreateModalOpen, setErrorMessageCreateModalOpen] = useState('')

  const handleMutateAdd = (tagInput: TagCreateInput) => {
    addTagMutateAsync(tagInput)
      .then(() => {
        setIsCreateModalOpen(false)
      })
      .catch((err) => {
        setErrorMessageCreateModalOpen(err.response.data.message)
      })
  }

  const handleOpenCreateModal = () => {
    setErrorMessageCreateModalOpen('')
    setIsCreateModalOpen(true)
  }

  const handleCancelCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  // ========= Edit =========
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editId, setEditId] = useState<number>()
  const [errorMessageEditModalOpen, setErrorMessageEditModalOpen] = useState('')
  const [editUser, setEditUser] = useState<TagDetailInput>()

  const handleMutateEdit = (tagInput: TagMutate) => {
    updateTagMutateAsync(tagInput)
      .then(() => {
        setIsEditModalOpen(false)
      })
      .catch((err) => {
        setErrorMessageEditModalOpen(err.response.data.message)
      })
  }

  const handleOpenEditModal = (tagInput: TagDetailInput) => {
    setEditUser(tagInput)
    setErrorMessageEditModalOpen('')
    setIsEditModalOpen(true)
  }

  const handleCancelEditModal = () => {
    setIsEditModalOpen(false)
  }

  // ========= Delete =========
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(0)

  const handleMutateDelete = () => {
    deleteTagMutateAsync(deleteId).then(() => {
      setIsDeleteModalOpen(false)
    })
  }

  const handleOpenDeleteModal = (id: number) => {
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
  const [restoreId, setRestoreId] = useState(0)

  const handleMutateRestore = () => {
    restoreTagMutateAsync(restoreId).then(() => {
      setIsRestoreModalOpen(false)
    })
  }

  const handleOpenRestoreModal = (id: number) => {
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
          {isSearching ? 'Search tag ' + searchState : 'All tag '} ({tags?.data?.totalCount})
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
              handleOpenCreateModal()
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
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0"
                        >
                          #
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Title
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Meta title
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Slug
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Image
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Content
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Post
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {tags?.data?.data.map((tag_detail: Tag) => (
                        <tr key={tag_detail.id}>
                          <td className="py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">
                            {tag_detail.id}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                            {tag_detail.title}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                            {tag_detail.metaTitle}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                            {tag_detail.slug}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                            <img className="w-10 h-auto" src={tag_detail.image} alt={tag_detail.image} />
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                            {tag_detail.content}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                            <CategoryCounter
                              category="Post"
                              counter={111}
                              onClick={() => navigate({ pathname: `${import.meta.env.VITE_ADMIN_ROUTE}/posts/${tag_detail.id}` })}
                            />
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditId(tag_detail.id)
                                handleOpenEditModal(tag_detail)
                              }}
                              className="text-gray-600 dark:text-white hover:opacity-80"
                            >
                              Edit<span className="sr-only">, {tag_detail.id}</span>
                            </button>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-8 pr-8 text-center text-sm font-medium sm:pr-0">
                            {tag_detail.deletedAt ? (
                              <button
                                onClick={async () => {
                                  handleOpenRestoreModal(tag_detail.id)
                                }}
                                className="w-5 h-5 text-blue-700 hover:opacity-80"
                              >
                                <ArrowPathIcon className="w-5 h-5" />
                              </button>
                            ) : (
                              <button
                                onClick={async () => {
                                  handleOpenDeleteModal(tag_detail.id)
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
                  {isCreateModalOpen && (
                    <CreateTagModal
                      errorMess={errorMessageCreateModalOpen}
                      onValid={async (values) => {
                        handleMutateAdd(values)
                      }}
                      onCancel={handleCancelCreateModal}
                    />
                  )}
                  {isEditModalOpen && (
                    <EditTagModal
                      errorMess={errorMessageEditModalOpen}
                      initialValues={editUser}
                      onValid={async (values) => {
                        handleMutateEdit({ ...values, id: editId })
                      }}
                      onCancel={handleCancelEditModal}
                    />
                  )}
                  {isDeleteModalOpen && (
                    <DeleteModal
                      title="Delete Tag"
                      body="Are you sure you want to delete this tag?"
                      actionDelete={handleMutateDelete}
                      onConfirm={handleConfirmDeleteModal}
                      onCancel={handleCancelDeleteModal}
                  />
                  )}
                  {isRestoreModalOpen && (
                    <RestoreModal
                      title="Restore Tag"
                      body="Are you sure you want to restore this tag?"
                      actionRestore={handleMutateRestore}
                      onConfirm={handleConfirmRestoreModal}
                      onCancel={handleCancelRestoreModal}
                    />
                  )}
                </div>
              </div>
              {tags?.data?.totalCount && tags?.data?.totalCount > 0 ? (
                <div className="flex justify-end mt-5">
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalCount={tags?.data?.totalCount}
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
    </main>
  )
}
