import { Navigate, Outlet } from 'react-router-dom'

import { getAdminFromLocalStorage } from '@/components/hooks/useQueryAdmin'

export const UnAuthLayout = () => {
  const admin = getAdminFromLocalStorage()

  if (admin) {
    return <Navigate to={import.meta.env.VITE_ADMIN_ROUTE} replace />
  }

  return (
    <div className="h-screen min-w-full bg-gray-200 dark:bg-gray-800 flex justify-center items-center">
      <div className="mb-[10vh] rounded-lg h-fit w-5/6 max-w-[600px] mx-auto">
        <Outlet />
      </div>
    </div>
  )
}
