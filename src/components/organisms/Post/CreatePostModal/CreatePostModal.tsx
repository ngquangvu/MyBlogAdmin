import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PostCreateInput, PostCreateInputSchema, defaultValuesPostCreate } from '@/schema/post'
import { User } from '@/types/user'
import { Modal } from '@/components/molecules/Modal'
import { Button } from '@/components/atoms/Button'
import { CancelButton } from '@/components/atoms/CancelButton'
import { TextboxWithTitle } from '@/components/molecules/TextboxWithTitle'
import { InputImageWithTitle } from '@/components/molecules/InputImageWithTitle'

type Props = {
  errorMess: string
  onCancel: () => void
  author: User | null

  initialValues?: Partial<PostCreateInput>
  onValid: (values: PostCreateInput) => Promise<void>
}

export default function CreatePostModal({ errorMess, onCancel, author, initialValues, onValid }: Props) {
  const [isClose, setIsClose] = useState(false)
  const [imageSrc, setImageSrc] = useState(initialValues?.thumbnail)
  const adminMail = localStorage.getItem('admin')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: { ...defaultValuesPostCreate, ...initialValues },
    resolver: zodResolver(PostCreateInputSchema)
  })

  useEffect(() => {
    setValue('authorId', author ? author.id : '')
  }, [])

  return (
    <Modal
      fragmentProps={{
        children: (
          <form onSubmit={handleSubmit(onValid)}>
            <div className="w-full sm:flex sm:items-start">
              <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold mt-2 mb-8"> Create Post</h2>

                <span className="text-red-500">{errorMess}</span>

                <div className="mt-5">
                  <div className="mb-4">
                    <label className="block text-gray-800 dark:text-white leading-6 text-sm font-semibold" htmlFor="firstName">
                      Author
                    </label>
                    <h3 className="w-full py-2 px-3 leading-6 text-gray-900 dark:text-white mb-1">{adminMail}</h3>
                  </div>
                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Title</p>
                    }}
                    textboxProps={{ ...register('title'), type: 'text' }}
                    error={errors.title?.message}
                    isRequired
                  />
                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Meta title</p>
                    }}
                    textboxProps={{ ...register('metaTitle'), type: 'text' }}
                    error={errors.metaTitle?.message}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Slug</p>
                    }}
                    textboxProps={{ ...register('slug'), type: 'text' }}
                    error={errors.slug?.message}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Summary</p>
                    }}
                    textboxProps={{ ...register('summary'), type: 'text' }}
                    error={errors.summary?.message}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Content</p>
                    }}
                    textboxProps={{ ...register('content'), type: 'text' }}
                    error={errors.content?.message}
                    isRequired
                  />

                  <InputImageWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Thumbnail</p>
                    }}
                    imageSrc={imageSrc}
                    textboxProps={{ ...register('thumbnail'), type: 'file' }}
                    error={errors.thumbnail?.message?.toString()}
                    isRequired
                  />

                  <TextboxWithTitle
                    className="mb-4"
                    labelProps={{
                      children: <p>Published</p>
                    }}
                    textboxProps={{ ...register('published'), type: 'text' }}
                    error={errors.published?.message}
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
