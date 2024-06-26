import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Loading } from '@/components/atoms/Loading'
import { getAdminFromLocalStorage } from '@/components/hooks/useQueryAdmin'
import { Aside } from '@/components/organisms/Aside'
import Header from '@/components/organisms/Header/Header'

export const AuthLayout = () => {
  const admin = getAdminFromLocalStorage()

  if (!admin) {
    return <Navigate to={import.meta.env.VITE_ADMIN_ROUTE + '/login'} replace />
  }

  return (
    <div className="w-full h-screen flex">
      <Aside />
      <div className="w-full h-full ">
        <Header />
        <div className="min-h-[calc(100vh-4rem)] p-[3vw] bg-white dark:bg-gray-700">
          <Suspense fallback={<Loading className="" />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
