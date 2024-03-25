import { ComponentPropsWithoutRef, FC, Fragment, useEffect, useRef, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'

type Props = {
  classNames?: string
  fragmentProps: ComponentPropsWithoutRef<'div'>
  onCancel: () => void
  isParentClose: boolean
}

export const Modal: FC<Props> = ({ classNames, fragmentProps: { children }, onCancel, isParentClose }) => {
  const cancelButtonRef = useRef(null)
  const [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    if (isParentClose) {
      handleCloseModal()
    }
  }, [isParentClose])

  function handleCloseModal() {
    closeModal()
    setTimeout(() => {
      onCancel()
    }, 300)
  }

  return (
    <Transition.Root appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[70]" initialFocus={cancelButtonRef} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-60 overflow-y-auto">
          <button type="button" onClick={() => handleCloseModal()} ref={cancelButtonRef} className="absolute inset-0" />
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`${classNames} relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6`}
              >
                {/* Content */}
                <div>{children}</div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
