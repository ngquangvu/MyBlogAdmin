import type { FC } from 'react'
import { useState } from 'react'

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Modal } from '@/components/molecules/Modal'
import { Button } from '@/components/atoms/Button'
import { CancelButton } from '@/components/atoms/CancelButton'

type Props = {
  title: string
  body: string
  actionDelete: () => void
  onConfirm: () => void
  onCancel: () => void
}

export const DeleteModal: FC<Props> = ({ title, body, actionDelete, onCancel }) => {
  const [isClose, setIsClose] = useState(false)

  return (
    <Modal
      fragmentProps={{
        children: (
          <div>
            <div className="sm:flex sm:items-start mt-2 mb-8">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div className="text-center ml-6 sm:mt-0 sm:text-left">
                <h2 className="text-lg font-semibold mb-2"> {title}</h2>
                <div className="">
                  <p className="text-sm text-gray-500">{body}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="button"
                onClick={actionDelete}
                className="text-white bg-red-600 hover:bg-red-700  focus:ring-red-300  dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-700"
              >
                Delete
              </Button>
              <CancelButton type="button" onClick={() => setIsClose(true)}>
                Cancel
              </CancelButton>
            </div>
          </div>
        )
      }}
      onCancel={onCancel}
      isParentClose={isClose}
    />
  )
}
