import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Home } from '@/pages/Home'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import { UnAuthLayout } from '@/components/layouts/UnAuthLayout'
import { Login } from '@/pages/Login'
import { Users } from '@/pages/Users'
import { Tags } from '@/pages/Tags'
import { Categories } from '@/pages/Categories'
import { Posts, PostCreate } from '@/components/templates/Posts'
import { PostEdit } from '@/components/templates/Posts/PostEdit'

export const RouterConfig: React.FC = () => {
  const adminRoute = import.meta.env.VITE_ADMIN_ROUTE
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path={adminRoute} element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="posts" element={<Posts />} />
            <Route index path="" element={<Navigate to={`partner`} />} />
            <Route path="posts">
              <Route index path="" element={<Posts/>} />
              <Route path="create" element={<PostCreate />} />
              <Route path="edit/:id" element={<PostEdit />} />
            </Route>
            <Route path="tags" element={<Tags />} />
            <Route path="categories" element={<Categories />} />
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
