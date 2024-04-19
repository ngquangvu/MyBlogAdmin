import { Suspense, useEffect, useState } from 'react'


import { Loading } from '@/components/atoms/Loading/Loading'
import {
  defaultValuesPostCreate,
  PostDetailInput,
  PostDetailInputSchema
} from '@/schema/post'
import { useQueryPostDetail } from '@/components/hooks/useQueryPost'
import { useQueryAdminUserDetail } from '@/components/hooks/useQueryAdmin'
import { Button } from '@/components/atoms/Button'
import { InputImageWithTitle } from '@/components/molecules/InputImageWithTitle'
import { TextboxWithTitle } from '@/components/molecules/TextboxWithTitle'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutatePostUpdate } from '@/components/hooks/useMutatePost'
import { useNavigate, useParams } from 'react-router-dom'
import { TextareaWithTitle } from '@/components/molecules/TextareaWithTitle'
import { SelectWithTitle } from '@/components/molecules/SelectWithTitle'

export const PostEdit = () => {
  let { id } = useParams()
  const { postDetail } = useQueryPostDetail(id ? id : '')
  const { adminUserDetail } = useQueryAdminUserDetail()
  const { mutateAsync: addPostMutateAsync } = useMutatePostUpdate()

  const navigate = useNavigate()
  const [errorMess, setErrorMess] = useState('')
  const [imageSrc, setImageSrc] = useState<string>()
  const adminMail = localStorage.getItem('admin')

  const handleMutateEdit = (postInput: PostDetailInput) => {
    addPostMutateAsync(postInput)
      .then(() => {
        navigate({ pathname: `${import.meta.env.VITE_ADMIN_ROUTE}/posts` })
      })
      .catch((err) => {
        setErrorMess(err.response.data.message)
      })
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: { ...defaultValuesPostCreate, ...postDetail?.data },
    resolver: zodResolver(PostDetailInputSchema)
  })

  const handleChangePublish = (event: { target: { value: { toString: () => string } } }) => {
    setValue('published', event.target.value.toString() === 'true' ? true : false, { shouldDirty: true })
  }

  useEffect(() => {
    setImageSrc(postDetail?.data ? postDetail?.data?.thumbnail : '')
  }, [])

  return (
    <main>
      <div className="flex justify-between items-center pr-4 sm:pr-6 lg:pr-8 mb-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"> Edit Post</h2>
      </div>
      <div className="mt-2 pb-9">
        <Suspense fallback={<Loading className="mt-20" />}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <form
                    onSubmit={handleSubmit(async (values) => {
                      handleMutateEdit(values)
                    })}
                  >
                    <div className="w-full sm:flex sm:items-start">
                      <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                        <span className="text-red-500">{errorMess}</span>

                        <div className="">
                          <div className="mb-4">
                            <label
                              className="block text-gray-800 dark:text-white leading-6 text-sm font-semibold"
                              htmlFor="firstName"
                            >
                              Author
                            </label>
                            <h3 className="w-full py-2 px-3 leading-6 text-gray-900 dark:text-white mb-1">
                              {adminMail}
                            </h3>
                          </div>

                          <TextboxWithTitle
                            className="hidden"
                            labelProps={{
                              children: <p>Id</p>
                            }}
                            textboxProps={{ ...register('id'), type: 'text', value: postDetail?.data?.id }}
                            error={errors.id?.message?.toString()}
                            isRequired
                          />

                          <TextboxWithTitle
                            className="hidden"
                            labelProps={{
                              children: <p>AuthorId</p>
                            }}
                            textboxProps={{ ...register('authorId'), type: 'text', value: adminUserDetail?.data?.id }}
                            error={errors.authorId?.message?.toString()}
                            isRequired
                          />

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
                          <div className="flex w-full max-w-[600px] space-x-5">
                            <TextboxWithTitle
                              className="w-1/2 mb-4"
                              labelProps={{
                                children: <p>Slug</p>
                              }}
                              textboxProps={{ ...register('slug'), type: 'text' }}
                              error={errors.slug?.message?.toString()}
                              isRequired
                            />

                            <TextboxWithTitle
                              className="w-1/2 mb-4"
                              labelProps={{
                                children: <p>Summary</p>
                              }}
                              textboxProps={{ ...register('summary'), type: 'text' }}
                              error={errors.summary?.message?.toString()}
                              isRequired
                            />
                          </div>

                          {/* <div className="mb-4">
                            <label>
                              <span
                                role="heading"
                                className="text-sm font-medium text-gray-700 dark:text-white required"
                              >
                                <p>Content</p>
                              </span>
                              <div className="mt-1">
                                <div className="">
                                  <Tiptap
                                    content=""
                                    className=""
                                    setContent={function (html: string): void {
                                      setValue('content', html)
                                    }}
                                  />
                                </div>
                              </div>
                            </label>
                            <div className="mt-2"></div>
                          </div> */}

                          <TextareaWithTitle
                            className="mb-4"
                            labelProps={{
                              children: <p>Content</p>
                            }}
                            textareaProps={{ ...register('content'), rows: 10 }}
                            error={errors.content?.message?.toString()}
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

                          <SelectWithTitle
                            className="mb-4"
                            labelProps={{
                              children: <p>Published</p>
                            }}
                            options={[
                              { value: 'true', name: 'True' },
                              { value: 'false', name: 'False' }
                            ]}
                            selectProps={{
                              onChange: (e) => {
                                handleChangePublish(e)
                              }
                            }}
                            error={errors.published?.message?.toString()}
                            isRequired
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <Button type="submit">Apply</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </main>
  )
}
