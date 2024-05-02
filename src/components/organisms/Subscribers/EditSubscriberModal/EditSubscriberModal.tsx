import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  defaultValuesSubscriberDetail,
  SubscriberDetailInputSchema,
  type SubscriberDetailInput
} from '@/schema/subscriber'
import { Button } from '@/components/atoms/Button'
import { CancelButton } from '@/components/atoms/CancelButton'
import { Modal } from '@/components/molecules/Modal'
import { TextboxWithTitle } from '@/components/molecules/TextboxWithTitle'
import { SelectWithTitle } from '@/components/molecules/SelectWithTitle'

type Props = {
  errorMess: string
  onCancel: () => void

  initialValues?: Partial<SubscriberDetailInput>
  onValid: (values: SubscriberDetailInput) => Promise<void>
}

export default function EditSubscriberModal({ errorMess, onCancel, initialValues, onValid }: Props) {
  const [isClose, setIsClose] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: { ...defaultValuesSubscriberDetail, ...initialValues },
    resolver: zodResolver(SubscriberDetailInputSchema)
  })

  // Handle change active
  const handleChangeActive = (event: { target: { value: { toString: () => string } } }) => {
    setValue('isActive', event.target.value.toString() === 'true' ? true : false, { shouldDirty: true })
  }

  // Handle change active
  const handleChangeAgree = (event: { target: { value: { toString: () => string } } }) => {
    setValue('isAgree', event.target.value.toString() === 'true' ? true : false, { shouldDirty: true })
  }

  return (
    <Modal
      fragmentProps={{
        children: (
          <form onSubmit={handleSubmit(onValid)}>
            <div className="w-full sm:flex sm:items-start">
              <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold mt-2 mb-8">Edit Subscriber</h2>

                <span className="text-red-500">{errorMess}</span>

                <div className="mt-5">
                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Mail</p>
                    }}
                    textboxProps={{ ...register('email'), type: 'email' }}
                    error={errors.email?.message?.toString()}
                    isRequired
                  />
                  <SelectWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Active</p>
                    }}
                    options={[
                      { value: 'true', name: 'True' },
                      { value: 'false', name: 'False' }
                    ]}
                    selectProps={{
                      onChange: (e) => {
                        handleChangeActive(e)
                      }
                    }}
                    error={errors.isActive?.message?.toString()}
                    isRequired
                  />

                  <SelectWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Agree</p>
                    }}
                    options={[
                      { value: 'true', name: 'True' },
                      { value: 'false', name: 'False' }
                    ]}
                    selectProps={{
                      onChange: (e) => {
                        handleChangeAgree(e)
                      }
                    }}
                    error={errors.isAgree?.message?.toString()}
                    isRequired
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <Button type="submit">Apply</Button>
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
