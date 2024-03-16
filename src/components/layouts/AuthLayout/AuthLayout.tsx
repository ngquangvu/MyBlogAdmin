import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Loading } from '@/components/atoms/Loading'
import { getAdminFromLocalStorage } from '@/components/hooks/useQueryAdmin'
import { Aside } from '@/components/molecules/Aside'
import Header from '@/components/molecules/Header/Header'

export const AuthLayout = () => {
  const admin = getAdminFromLocalStorage()

  if (!admin) {
    return <Navigate to={import.meta.env.VITE_ADMIN_ROUTE + '/login'} replace />
  }

  return (
    <div className="w-full h-screen flex">
      <Aside />
      <div className="w-full h-full">
        <Header />
        <div className="p-[3vw]">
          <Suspense fallback={<Loading className="" />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
