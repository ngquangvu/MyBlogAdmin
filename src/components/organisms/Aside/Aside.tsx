import { Link, useLocation } from 'react-router-dom'

import {
  HomeIcon,
  UsersIcon,
  SwatchIcon,
  ListBulletIcon,
  ChatBubbleLeftIcon,
  TagIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

import logo from '@/assets/images/logo.svg'
import { classNames } from '@/utils'

export const Aside = () => {
  const { pathname } = useLocation()

  const navigation = [
    { name: 'Home', href: '', icon: HomeIcon, current: pathname === import.meta.env.VITE_ADMIN_ROUTE },
    { name: 'User', href: 'users', icon: UsersIcon, current: pathname.includes('users') },
    { name: 'Post', href: 'posts', icon: ListBulletIcon, current: pathname.includes('posts') },
    { name: 'Comment', href: 'comments', icon: ChatBubbleLeftIcon, current: pathname.includes('comments') },
    { name: 'Category', href: 'categories', icon: SwatchIcon, current: pathname.includes('categories') },
    { name: 'Tag', href: 'tags', icon: TagIcon, current: pathname.includes('tags') },
    { name: 'Admin', href: 'admins', icon: ShieldCheckIcon, current: pathname.includes('admins') }
  ]

  return (
    <aside className="w-52 md:w-52 lg:w-52 xl:w-56 min-h-full">
      <div className="h-full w-52 md:w-52 lg:w-52 xl:w-56 inset-y-0 z-50 flex flex-col">
        <div className="fixed z-[60] w-52 md:w-52 lg:w-52 xl:w-56 h-full flex flex-col gap-y-5 o border-r border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 px-7 py-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link className="flex items-center space-x-2" to={import.meta.env.VITE_ADMIN_ROUTE}>
              <img className="h-7 w-auto" src={logo} alt="logo" /> <h1 className='text-gray-900 dark:text-white'>My Blog</h1>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-700 '
                            : 'text-gray-700 hover:text-gray-700 dark:text-white dark:hover:text-gray-700 hover:bg-gray-50',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-700',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  )
}
