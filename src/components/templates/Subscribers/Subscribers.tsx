import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRecoilState, useRecoilValue } from 'recoil'

import { Loading } from '@/components/atoms/Loading/Loading'
import { SearchBox } from '@/components/molecules/SearchBox'
import { Pagination } from '@/components/organisms/Pagination'
import { useQuerySubscribers } from '@/components/hooks/useQuerySubscriber'
import { subscribersPageState, subscribersSearchQueryState, subscribersSearchState } from '@/states'
import { SubscriberCreateInput, SubscriberDetailInput } from '@/schema/subscriber'
import {
  useMutateSubscriberCreate,
  useMutateSubscriberDelete,
  useMutateSubscriberRestore,
  useMutateSubscriberUpdate
} from '@/components/hooks/useMutateSubscriber'
import { Subscriber, SubscriberMutate } from '@/types/subscriber'
import { DeleteModal } from '@/components/organisms/DeleteModal'
import { RestoreModal } from '@/components/organisms/RestoreModal'
import CreateSubscriberModal from '@/components/organisms/Subscribers/CreateSubscriberModal/CreateSubscriberModal'
import EditSubscriberModal from '@/components/organisms/Subscribers/EditSubscriberModal/EditSubscriberModal'

export const Subscribers = () => {
  const subscribersQuery = useRecoilValue(subscribersSearchQueryState)
  const [searchState, setSubscribersSearch] = useRecoilState(subscribersSearchState)
  const { mutateAsync: addSubscriberMutateAsync } = useMutateSubscriberCreate()
  const { mutateAsync: updateSubscriberMutateAsync } = useMutateSubscriberUpdate()
  const { mutateAsync: deleteSubscriberMutateAsync } = useMutateSubscriberDelete()
  const { mutateAsync: restoreSubscriberMutateAsync } = useMutateSubscriberRestore()
  const { subscribers } = useQuerySubscribers(subscribersQuery)
  const [page, setPage] = useRecoilState(subscribersPageState)

  const navigate = useNavigate()

  // ========= Search =========
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>(searchState || '')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSearching(searchText !== '')

    setSubscribersSearch(searchText)
  }

  // ========= Create =========
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [errorMessageCreateModalOpen, setErrorMessageCreateModalOpen] = useState('')

  const handleMutateAdd = (subscriberInput: SubscriberCreateInput) => {
    addSubscriberMutateAsync(subscriberInput)
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
  const [editId, setEditId] = useState<string>()
  const [errorMessageEditModalOpen, setErrorMessageEditModalOpen] = useState('')
  const [editUser, setEditUser] = useState<SubscriberDetailInput>()

  const handleMutateEdit = (subscriberInput: SubscriberMutate) => {
    updateSubscriberMutateAsync(subscriberInput)
      .then(() => {
        setIsEditModalOpen(false)
      })
      .catch((err) => {
        setErrorMessageEditModalOpen(err.response.data.message)
      })
  }

  const handleOpenEditModal = (subscriberInput: SubscriberDetailInput) => {
    setEditUser(subscriberInput)
    setErrorMessageEditModalOpen('')
    setIsEditModalOpen(true)
  }

  const handleCancelEditModal = () => {
    setIsEditModalOpen(false)
  }

  // ========= Delete =========
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const handleMutateDelete = () => {
    deleteSubscriberMutateAsync(deleteId).then(() => {
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
  const [restoreId, setRestoreId] = useState('')

  const handleMutateRestore = () => {
    restoreSubscriberMutateAsync(restoreId).then(() => {
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
          {isSearching ? 'Search subscriber ' + searchState : 'All subscriber '} ({subscribers?.data?.totalCount})
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
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Is Active
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Is Agree
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {subscribers?.data?.data.map((subscriber_detail: Subscriber) => (
                        <tr key={subscriber_detail.id}>
                          <td className="py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 dark:text-white sm:pl-0">
                            {subscriber_detail.id}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">{subscriber_detail.email}</td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                            {subscriber_detail.isActive ? '⚪︎' : ''}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-500 dark:text-white">
                            {subscriber_detail.isAgree ? '⚪︎' : ''}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditId(subscriber_detail.id)
                                handleOpenEditModal(subscriber_detail)
                              }}
                              className="text-gray-600 dark:text-white hover:opacity-80"
                            >
                              Edit<span className="sr-only">, {subscriber_detail.id}</span>
                            </button>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-8 pr-8 text-center text-sm font-medium sm:pr-0">
                            {subscriber_detail.deletedAt ? (
                              <button
                                onClick={async () => {
                                  handleOpenRestoreModal(subscriber_detail.id)
                                }}
                                className="w-5 h-5 text-blue-700 hover:opacity-80"
                              >
                                <ArrowPathIcon className="w-5 h-5" />
                              </button>
                            ) : (
                              <button
                                onClick={async () => {
                                  handleOpenDeleteModal(subscriber_detail.id)
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
                    <CreateSubscriberModal
                      errorMess={errorMessageCreateModalOpen}
                      onValid={async (values) => {
                        handleMutateAdd(values)
                      }}
                      onCancel={handleCancelCreateModal}
                    />
                  )}
                  {isEditModalOpen && (
                    <EditSubscriberModal
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
                      title="Delete Subscriber"
                      body="Are you sure you want to delete this subscriber?"
                      actionDelete={handleMutateDelete}
                      onConfirm={handleConfirmDeleteModal}
                      onCancel={handleCancelDeleteModal}
                    />
                  )}
                  {isRestoreModalOpen && (
                    <RestoreModal
                      title="Restore Subscriber"
                      body="Are you sure you want to restore this subscriber?"
                      actionRestore={handleMutateRestore}
                      onConfirm={handleConfirmRestoreModal}
                      onCancel={handleCancelRestoreModal}
                    />
                  )}
                </div>
              </div>
              {subscribers?.data?.totalCount && subscribers?.data?.totalCount > 0 ? (
                <div className="flex justify-end mt-5">
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalCount={subscribers?.data?.totalCount}
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
