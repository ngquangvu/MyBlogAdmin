import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PostDetailInput, defaultValuesPostDetail, PostDetailInputSchema } from '@/schema/post'
import { Button } from '@/components/atoms/Button'
import { CancelButton } from '@/components/atoms/CancelButton'
import { Modal } from '@/components/molecules/Modal'
import { TextboxWithTitle } from '@/components/molecules/TextboxWithTitle'
import { useState } from 'react'

type Props = {
  errorMess: string
  onCancel: () => void

  initialValues?: Partial<PostDetailInput>
  onValid: (values: PostDetailInput) => Promise<void>
}

export default function EditPostModal({ errorMess, onCancel, initialValues, onValid }: Props) {
  const [isClose, setIsClose] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { ...defaultValuesPostDetail, ...initialValues },
    resolver: zodResolver(PostDetailInputSchema)
  })

  return (
    <Modal
      fragmentProps={{
        children: (
          <form onSubmit={handleSubmit(onValid)}>
            <div className="w-full sm:flex sm:items-start">
              <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                <h2 className="text-lg font-semibold mt-2 mb-8">Edit Post</h2>

                <span className="text-red-500">{errorMess}</span>

                <div className="mt-5">
                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Title</p>
                    }}
                    textboxProps={{ ...register('title'), type: 'text' }}
                    error={errors.title?.message?.toString()}
                    isRequired
                  />
                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Meta title</p>
                    }}
                    textboxProps={{ ...register('metaTitle'), type: 'text' }}
                    error={errors.metaTitle?.message?.toString()}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Slug</p>
                    }}
                    textboxProps={{ ...register('slug'), type: 'text' }}
                    error={errors.slug?.message?.toString()}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Summary</p>
                    }}
                    textboxProps={{ ...register('summary'), type: 'text' }}
                    error={errors.summary?.message?.toString()}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Content</p>
                    }}
                    textboxProps={{ ...register('content'), type: 'text' }}
                    error={errors.content?.message?.toString()}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Thumbnail</p>
                    }}
                    textboxProps={{ ...register('thumbnail'), type: 'text' }}
                    error={errors.thumbnail?.message?.toString()}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Published</p>
                    }}
                    textboxProps={{ ...register('published'), type: 'text' }}
                    error={errors.published?.message?.toString()}
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
