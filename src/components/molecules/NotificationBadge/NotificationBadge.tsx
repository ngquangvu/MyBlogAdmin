import type { FC } from 'react'
import { Fragment, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

import { Transition } from '@headlessui/react'
import { NotificationType } from '@/types/common'

type Props = {
  show?: boolean
  setShow?: (show: boolean) => void
  type?: NotificationType
  text?: string
  message?: string
}

export const NotificationBadge: FC<Props> = ({ show, setShow = undefined, type, text, message = undefined }) => {
  useEffect(() => {
    setTimeout(() => {
      if (setShow && show) {
        show = false
        setShow(show)
      }
    }, 2000)
  }, [show])

  return (
    <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-start px-10 py-6 z-[90]">
      <div className="flex w-full flex-col items-center space-y-4 px-10">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 xl:translate-y-0 xl:translate-x-2"
          enterTo="translate-y-0 opacity-100 xl:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-[348px] overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="mt-1 mx-1">
                  {type === NotificationType.SUCCESS ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                  ) : (
                    <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{text}</h3>
                  {message && <p className="mt-1text-[1.691vh] xl:text-sm text-gray-500">{message}</p>}
                </div>
                {setShow && (
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}
