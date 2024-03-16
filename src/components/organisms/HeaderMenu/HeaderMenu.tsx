import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Menu, Transition } from '@headlessui/react'

import { useMutateLogout } from '@/components/hooks/useMutateAdmin'
import { classNames } from '@/utils'

export const HeaderMenu = () => {
  const { mutateAsync } = useMutateLogout()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string | null>('')

  useEffect(() => {
    setEmail(localStorage.getItem('admin'))
  }, [])

  const handleLogout = async () => {
    mutateAsync({}).finally(() => {
      navigate(import.meta.env.VITE_ADMIN_ROUTE + '/login')
    })
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center hover:opacity-80">
            <span className="inline-block h-9 w-9 overflow-hidden rounded-full bg-gray-200">
              <svg className="h-full w-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 min-w-[230px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 w-full">
              {email && (
                <Menu.Item>
                  {() => <span className={'block w-full px-4 py-2 text-sm text-gray-700 border-b'}>{email}</span>}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'w-full text-left px-4 py-2 text-sm font-semibold'
                    )}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
