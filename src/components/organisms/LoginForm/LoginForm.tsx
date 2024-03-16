import { memo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { LoginInput } from '@/types/login'

import { LoginInputSchema } from '@/types/login'

type Props = {
  initialValues?: Partial<LoginInput>
  onValid: (values: LoginInput) => Promise<void>
}

const defaultValues: LoginInput = {
  email: '',
  password: ''
}

export const LoginForm = memo(({ initialValues, onValid }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { ...defaultValues, ...initialValues },
    resolver: zodResolver(LoginInputSchema)
  })

  return (
    <form className="mt-4 grid grid-cols-1 gap-y-3 sm:gap-y-5" onSubmit={handleSubmit(onValid)}>
      <div>
        <label className="block text-gray-800 leading-6 text-sm font-semibold mb-2" htmlFor="email">
          Mail
        </label>
        <input
          {...register('email')}
          className="appearance-none border rounded w-full py-2 px-3 leading-6 mb-1 "
          id="email"
          type="text"
          placeholder="example@mail.com"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>
      <div className="mb-6">
        <label className="block text-gray-800 leading-6 text-sm font-semibold mb-2" htmlFor="password">
          Password
        </label>
        <input
          {...register('password')}
          className="appearance-none border rounded w-full py-2 px-3 leading-6 mb-1"
          id="password"
          type="password"
          placeholder="**********"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>
      <div className="flex items-center justify-end">
        <button
          disabled={isSubmitting}
          className=" text-gray-800 bg-gray-100 hover:opacity-80 leading-6 text-sm font-semibold py-2 px-4 rounded"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  )
})
