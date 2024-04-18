import { Suspense, useEffect, useState } from 'react'

import { useRecoilState, useRecoilValue } from 'recoil'

import { Loading } from '@/components/atoms/Loading/Loading'
import { Pagination } from '@/components/organisms/Pagination'
import { defaultValuesPostCreate, PostCreateInput, PostCreateInputSchema } from '@/schema/post'
import { useQueryPosts } from '@/components/hooks/useQueryPost'
import { postsSearchQueryState, postsPageState } from '@/states/postsSearchQueryState'
import { getAdminFromLocalStorage, useQueryAdminUserDetail } from '@/components/hooks/useQueryAdmin'
import { NotificationType } from '@/types/common'
import { NotificationBadge } from '@/components/organisms/NotificationBadge'
import { Button } from '@/components/atoms/Button'
import { InputImageWithTitle } from '@/components/molecules/InputImageWithTitle'
import { TextboxWithTitle } from '@/components/molecules/TextboxWithTitle'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutatePostCreate } from '@/components/hooks/useMutatePost'
import { useNavigate } from 'react-router-dom'
import { Tiptap } from '@/components/molecules/Tiptap'

export const PostCreate = () => {
  const postsQuery = useRecoilValue(postsSearchQueryState)
  const adminEmail = getAdminFromLocalStorage()
  const { adminUserDetail } = useQueryAdminUserDetail(adminEmail ? adminEmail : '')
  const { mutateAsync: addPostMutateAsync } = useMutatePostCreate()
  const { posts } = useQueryPosts(postsQuery)
  const [page, setPage] = useRecoilState(postsPageState)

  // ========= Notification =========
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [notificationObj, setNotification] = useState<{
    type: NotificationType
    title: string
    message: string
  } | null>(null)

  const navigate = useNavigate()
  const [errorMess, setErrorMess] = useState('')
  const [imageSrc, setImageSrc] = useState()
  const adminMail = localStorage.getItem('admin')

  const handleMutateAdd = (postInput: PostCreateInput) => {
    addPostMutateAsync(postInput)
      .then(() => {
        navigate({ pathname: `${import.meta.env.VITE_ADMIN_ROUTE}/posts` })
      })
      .catch((err) => {
        setImageSrc(err.response.data.message)
      })
  }

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: { ...defaultValuesPostCreate },
    resolver: zodResolver(PostCreateInputSchema)
  })

  useEffect(() => {
    setValue('authorId', adminUserDetail?.data ? adminUserDetail.data.id : '')
  }, [adminUserDetail])

  return (
    <main>
      <div className="flex justify-between items-center pr-4 sm:pr-6 lg:pr-8 mb-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"> Create Post</h2>
      </div>
      <div className="mt-2 pb-9">
        <Suspense fallback={<Loading className="mt-20" />}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <form
                    onSubmit={handleSubmit(async (values) => {
                      handleMutateAdd(values)
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
                          <div className="flex w-full max-w-[600px] space-x-5">
                            <TextboxWithTitle
                              className="w-1/2 mb-4"
                              labelProps={{
                                children: <p>Slug</p>
                              }}
                              textboxProps={{ ...register('slug'), type: 'text' }}
                              error={errors.slug?.message}
                              isRequired
                            />

                            <TextboxWithTitle
                              className="w-1/2 mb-4"
                              labelProps={{
                                children: <p>Summary</p>
                              }}
                              textboxProps={{ ...register('summary'), type: 'text' }}
                              error={errors.summary?.message}
                              isRequired
                            />
                          </div>

                          <div className="mb-4">
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
                          </div>

                          {/* <TextboxWithTitle
                            className="mb-4"
                            labelProps={{
                              children: <p>Content</p>
                            }}
                            textboxProps={{ ...register('content'), type: 'text' }}
                            error={errors.content?.message}
                            isRequired
                          /> */}

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
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
      <NotificationBadge
        show={showNotification}
        setShow={setShowNotification}
        type={notificationObj?.type}
        text={notificationObj?.title}
        message={notificationObj?.message}
      />
    </main>
  )
}
