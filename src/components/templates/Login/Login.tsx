import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '@/assets/images/logo.svg'
import { useMutateLogin } from '@/components/hooks/useMutateAdmin'
import { LoginForm } from '@/components/organisms/LoginForm'

export const LoginTemplate = () => {
  const navigate = useNavigate()
  const { mutateAsync } = useMutateLogin()
  const [error, setError] = useState('')

  return (
    <>
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col">
        <img className="h-8 w-auto mt-3" src={logo} alt="logo" />

        <h1 className="text-lg leading-8 font-semibold mt-5 mb-3">Login</h1>

        {error && <span className="text-red-500">{error}</span>}

        <LoginForm
          onValid={async (values: any) => {
            await mutateAsync(values)
              .then((result) => {
                if (result?.statusCode != 401) {
                  navigate(import.meta.env.VITE_ADMIN_ROUTE)
                } else {
                  console.log(111)

                  setError(result?.message)
                }
              })
              .catch((error) => {
                setError(error)
              })
          }}
        />
      </div>
    </>
  )
}
