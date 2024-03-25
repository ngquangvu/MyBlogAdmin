import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRecoilState, useRecoilValue } from 'recoil'

import type { UserCreateInput, UserDetailInput } from '@/schema/user'
import type { User, UserMutate } from '@/types/user'

import { Loading } from '@/components/atoms/Loading/Loading'
import { useMutateUserCreate, useMutateUserDelete, useMutateUserRestore, useMutateUserUpdate } from '@/components/hooks/useMutateUser'
import { useQueryUsers } from '@/components/hooks/useQueryUser'
import { SearchBox } from '@/components/molecules/SearchBox'
import { Pagination } from '@/components/organisms/Pagination'
import { usersPageState, usersSearchQueryState, usersSearchState } from '@/states'
import { CategoryCounter } from '@/components/organisms/CategoryCounter'
import { DeleteModal } from '@/components/organisms/DeleteModal'
import { RestoreModal } from '@/components/organisms/RestoreModal'
import CreateUserModal from '@/components/organisms/Users/CreateUserModal/CreateUserModal'
import EditUserModal from '@/components/organisms/Users/EditUserModal/EditUserModal'

export const Users = () => {
  const usersQuery = useRecoilValue(usersSearchQueryState)
  const [searchState, setUsersSearch] = useRecoilState(usersSearchState)
  const { mutateAsync: addUserMutateAsync } = useMutateUserCreate()
  const { mutateAsync: updateUserMutateAsync } = useMutateUserUpdate()
  const { mutateAsync: deleteUserMutateAsync } = useMutateUserDelete()
  const { mutateAsync: restoreUserMutateAsync } = useMutateUserRestore()
  const { users } = useQueryUsers(usersQuery)
  const [page, setPage] = useRecoilState(usersPageState)

  const navigate = useNavigate()

  // ========= Search =========
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>(searchState || '')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSearching(searchText !== '')

    setUsersSearch(searchText)
  }

  // ========= Create =========
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [errorMessageCreateModalOpen, setErrorMessageCreateModalOpen] = useState('')

  const handleMutateAdd = (userInput: UserCreateInput) => {
    addUserMutateAsync(userInput)
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
  const [editUser, setEditUser] = useState<UserDetailInput>()

  const handleMutateEdit = (userInput: UserMutate) => {
    if (!userInput.password) {
      delete userInput.password
    }
    updateUserMutateAsync(userInput)
      .then(() => {
        setIsEditModalOpen(false)
      })
      .catch((err) => {
        setErrorMessageEditModalOpen(err.response.data.message)
      })
  }

  const handleOpenEditModal = (userInput: UserDetailInput) => {
    setEditUser(userInput)
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
    deleteUserMutateAsync(deleteId).then(() => {
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
    restoreUserMutateAsync(restoreId).then(() => {
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
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {isSearching ? 'Search user ' + searchState : 'All user '} ({users?.data?.totalCount})
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
            className="ml-3 block rounded-md bg-gray-200 hover:opacity-80 px-3 py-2 text-center text-sm font-semibold text-gray-700 "
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
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Mail
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Post
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users?.data?.data.map((user_detail: User) => (
                        <tr key={user_detail.id}>
                          <td className="py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0">
                            {user_detail.email}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            {user_detail.firstName + ' ' + user_detail.lastName}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500">
                            <CategoryCounter
                              category="Post"
                              counter={user_detail.posts.length}
                              onClick={() => navigate({ pathname: `${import.meta.env.VITE_ADMIN_ROUTE}/posts/${user_detail.id}` })}
                            />
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditId(user_detail.id)
                                handleOpenEditModal(user_detail)
                              }}
                              className="text-gray-600 hover:opacity-80"
                            >
                              Edit<span className="sr-only">, {user_detail.email}</span>
                            </button>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-8 pr-8 text-center text-sm font-medium sm:pr-0">
                            {user_detail.deletedAt ? (
                              <button
                                onClick={async () => {
                                  handleOpenRestoreModal(user_detail.id)
                                }}
                                className="w-5 h-5 text-blue-700 hover:opacity-80"
                              >
                                <ArrowPathIcon className="w-5 h-5" />
                              </button>
                            ) : (
                              <button
                                onClick={async () => {
                                  handleOpenDeleteModal(user_detail.id)
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
                    <CreateUserModal
                      errorMess={errorMessageCreateModalOpen}
                      onValid={async (values) => {
                        handleMutateAdd(values)
                      }}
                      onCancel={handleCancelCreateModal}
                    />
                  )}
                  {isEditModalOpen && (
                    <EditUserModal
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
                      title="Delete User"
                      body="Are you sure you want to delete this user? This action cannot be undone."
                      actionDelete={handleMutateDelete}
                      onConfirm={handleConfirmDeleteModal}
                      onCancel={handleCancelDeleteModal}
                  />
                  )}
                  {isRestoreModalOpen && (
                    <RestoreModal
                      title="Restore User"
                      body="Are you sure you want to restore this user?"
                      actionRestore={handleMutateRestore}
                      onConfirm={handleConfirmRestoreModal}
                      onCancel={handleCancelRestoreModal}
                  />
                  )}
                </div>
              </div>
              {users?.data?.totalCount && users?.data?.totalCount > 0 ? (
                <div className="flex justify-end mt-5">
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalCount={users?.data?.totalCount}
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
