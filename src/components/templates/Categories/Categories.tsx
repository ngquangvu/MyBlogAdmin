import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TrashIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Loading } from '@/components/atoms/Loading/Loading'
import { SearchBox } from '@/components/molecules/SearchBox'
import { Pagination } from '@/components/organisms/Pagination'
import {
  categoriesSearchQueryState,
  categoriesSearchState,
  categoriesPageState
} from '@/states/categoriesSearchQueryState'
import {
  useMutateCategoryCreate,
  useMutateCategoryUpdate,
  useMutateCategoryDelete,
  useMutateCategoryRestore
} from '@/components/hooks/useMutateCategory'
import { useQueryCategories } from '@/components/hooks/useQueryCategory'
import { CategoryMutate, Category } from '@/types/category'
import { CategoryCreateInput, CategoryDetailInput } from '@/schema/category'
import { CategoryCounter } from '@/components/organisms/CategoryCounter'
import { DeleteModal } from '@/components/organisms/DeleteModal'
import { RestoreModal } from '@/components/organisms/RestoreModal'
import CreateCategoryModal from '@/components/organisms/Category/CreateCategoryModal/CreateCategoryModal'
import EditCategoryModal from '@/components/organisms/Category/EditCategoryModal/EditCategoryModal'

export const Categories = () => {
  const categoriesQuery = useRecoilValue(categoriesSearchQueryState)
  const [searchState, setCategoriesSearch] = useRecoilState(categoriesSearchState)
  const { mutateAsync: addCategoryMutateAsync } = useMutateCategoryCreate()
  const { mutateAsync: updateCategoryMutateAsync } = useMutateCategoryUpdate()
  const { mutateAsync: deleteCategoryMutateAsync } = useMutateCategoryDelete()
  const { mutateAsync: restoreCategoryMutateAsync } = useMutateCategoryRestore()
  const { categories } = useQueryCategories(categoriesQuery)
  const [page, setPage] = useRecoilState(categoriesPageState)

  const navigate = useNavigate()

  // ========= Search =========
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>(searchState || '')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSearching(searchText !== '')

    setCategoriesSearch(searchText)
  }

  // ========= Create =========
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [errorMessageCreateModalOpen, setErrorMessageCreateModalOpen] = useState('')

  const handleMutateAdd = (cateInput: CategoryCreateInput) => {
    addCategoryMutateAsync(cateInput)
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
  const [editUser, setEditUser] = useState<CategoryDetailInput>()

  const handleMutateEdit = (cateInput: CategoryMutate) => {
    updateCategoryMutateAsync(cateInput)
      .then(() => {
        setIsEditModalOpen(false)
      })
      .catch((err) => {
        setErrorMessageEditModalOpen(err.response.data.message)
      })
  }

  const handleOpenEditModal = (cateInput: CategoryDetailInput) => {
    setEditUser(cateInput)
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
    deleteCategoryMutateAsync(deleteId).then(() => {
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
    restoreCategoryMutateAsync(restoreId).then(() => {
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
          {isSearching ? 'Search category ' + searchState : 'All category '} ({categories?.data?.totalCount})
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
                          Parent #
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
                      {categories?.data?.data.map((cate_detail: Category) => (
                        <tr key={cate_detail.id}>
                          <td className="py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">
                            {cate_detail.id}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">{cate_detail.parentId}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">{cate_detail.title}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">{cate_detail.metaTitle}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">{cate_detail.slug}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                            <img className="w-10 h-auto" src={cate_detail.image} alt={cate_detail.image} />
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">{cate_detail.content}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                            <CategoryCounter
                              category="Post"
                              counter={111}
                              onClick={() =>
                                navigate({ pathname: `${import.meta.env.VITE_ADMIN_ROUTE}/posts/${cate_detail.id}` })
                              }
                            />
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditId(cate_detail.id)
                                handleOpenEditModal(cate_detail)
                              }}
                              className="text-gray-600 dark:text-white hover:opacity-80"
                            >
                              Edit<span className="sr-only">, {cate_detail.id}</span>
                            </button>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-8 pr-8 text-center text-sm font-medium sm:pr-0">
                            {cate_detail.deletedAt ? (
                              <button
                                onClick={async () => {
                                  handleOpenRestoreModal(cate_detail.id)
                                }}
                                className="w-5 h-5 text-blue-700 hover:opacity-80"
                              >
                                <ArrowPathIcon className="w-5 h-5" />
                              </button>
                            ) : (
                              <button
                                onClick={async () => {
                                  handleOpenDeleteModal(cate_detail.id)
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
                    <CreateCategoryModal
                      errorMess={errorMessageCreateModalOpen}
                      onValid={async (values) => {
                        handleMutateAdd(values)
                      }}
                      onCancel={handleCancelCreateModal}
                    />
                  )}
                  {isEditModalOpen && (
                    <EditCategoryModal
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
                      title="Delete Category"
                      body="Are you sure you want to delete this category?"
                      actionDelete={handleMutateDelete}
                      onConfirm={handleConfirmDeleteModal}
                      onCancel={handleCancelDeleteModal}
                    />
                  )}
                  {isRestoreModalOpen && (
                    <RestoreModal
                      title="Restore Category"
                      body="Are you sure you want to restore this category?"
                      actionRestore={handleMutateRestore}
                      onConfirm={handleConfirmRestoreModal}
                      onCancel={handleCancelRestoreModal}
                    />
                  )}
                </div>
              </div>
              {categories?.data?.totalCount && categories?.data?.totalCount > 0 ? (
                <div className="flex justify-end mt-5">
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalCount={categories?.data?.totalCount}
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
