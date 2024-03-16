import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Home } from '@/pages/Home'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { UnAuthLayout } from '@/components/layouts/UnAuthLayout'
import { Login } from '@/pages/Login'
import { Users } from '@/pages/Users'

export const RouterConfig: React.FC = () => {
  const adminRoute = import.meta.env.VITE_ADMIN_ROUTE
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path={adminRoute} element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
          </Route>

          <Route path={adminRoute} element={<UnAuthLayout />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<Navigate to={adminRoute} replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
