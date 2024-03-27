import type { FC } from 'react'
import { useState } from 'react'

import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/atoms/Button'
import { CancelButton } from '@/components/atoms/CancelButton'
import { Modal } from '@/components/molecules/Modal'

type Props = {
  title: string
  body: string
  actionRestore: () => void
  onConfirm: () => void
  onCancel: () => void
}

export const RestoreModal: FC<Props> = ({ title, body, actionRestore, onCancel }) => {
  const [isClose, setIsClose] = useState(false)

  return (
    <Modal
      fragmentProps={{
        children: (
          <div>
            <div className="sm:flex sm:items-start mt-2 mb-8">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <ArrowPathIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="text-center ml-6 sm:mt-0 sm:text-left">
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white"> {title}</h2>
                <div className="">
                  <p className="text-sm text-gray-500 dark:text-white">{body}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <Button type="button" onClick={actionRestore} className="">
                Restore
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
