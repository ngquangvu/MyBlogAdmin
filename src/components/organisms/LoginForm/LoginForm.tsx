import { memo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { LoginInput } from '@/types/login'

import { LoginInputSchema } from '@/types/login'
import { TextboxWithTitle } from '@/components/molecules/TextboxWithTitle'
import { Button } from '@/components/atoms/Button'

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
      <TextboxWithTitle
        className=""
        labelProps={{
          children: <p>Mail</p>
        }}
        textboxProps={register('email')}
        error={errors.email?.message}
        isRequired
      />
      <TextboxWithTitle
        className=""
        labelProps={{
          children: <p>Password</p>
        }}
        textboxProps={{ ...register('password'), type: 'password', placeholder: '*********' }}
        error={errors.password?.message}
        isRequired
      />
      <div className="flex items-center justify-end">
        <Button disabled={isSubmitting}  type="submit">
          Login
        </Button>
      </div>
    </form>
  )
})
