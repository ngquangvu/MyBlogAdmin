import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { UserCreateInputSchema, type UserCreateInput, defaultValuesUserCreate } from '@/schema/user'
import { Button } from '@/components/atoms/Button'
import { CancelButton } from '@/components/atoms/CancelButton'
import { Modal } from '@/components/molecules/Modal'
import { TextboxWithTitle } from '@/components/molecules/TextboxWithTitle'
import { useState } from 'react'

type Props = {
  errorMess: string
  onCancel: () => void

  initialValues?: Partial<UserCreateInput>
  onValid: (values: UserCreateInput) => Promise<void>
}

export default function CreateUserModal({ errorMess, onCancel, initialValues, onValid }: Props) {
  const [isClose, setIsClose] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { ...defaultValuesUserCreate, ...initialValues },
    resolver: zodResolver(UserCreateInputSchema)
  })

  return (
    <Modal
      fragmentProps={{
        children: (
          <form onSubmit={handleSubmit(onValid)}>
            <div className="w-full sm:flex sm:items-start">
              <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold mt-2 mb-8">Create User</h2>

                <span className="text-red-500">{errorMess}</span>

                <div className="mt-5">
                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Mail</p>
                    }}
                    textboxProps={{ ...register('email'), type: 'email' }}
                    error={errors.email?.message}
                    isRequired
                  />
                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>First name</p>
                    }}
                    textboxProps={{ ...register('firstName'), type: 'text' }}
                    error={errors.firstName?.message}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Last name</p>
                    }}
                    textboxProps={{ ...register('lastName'), type: 'text' }}
                    error={errors.lastName?.message}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Password</p>
                    }}
                    textboxProps={{ ...register('password'), type: 'password' }}
                    error={errors.password?.message}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Password (confirm)</p>
                    }}
                    textboxProps={{ ...register('confirmPassword'), type: 'password' }}
                    error={errors.confirmPassword?.message}
                    isRequired
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <Button type="submit">Create</Button>
              <CancelButton type="button" onClick={() => setIsClose(true)}>
                Cancel
              </CancelButton>
            </div>
          </form>
        )
      }}
      onCancel={onCancel}
      isParentClose={isClose}
    />
  )
}
