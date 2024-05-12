import { Suspense, useEffect, useState } from 'react'

import { Loading } from '@/components/atoms/Loading/Loading'
import { defaultValuesPostCreate, PostCreateInput, PostCreateInputSchema } from '@/schema/post'
import { useQueryAdminUserDetail } from '@/components/hooks/useQueryAdmin'
import { NotificationType } from '@/types/common'
import { NotificationBadge } from '@/components/organisms/NotificationBadge'
import { Button } from '@/components/atoms/Button'
import { InputImageWithTitle } from '@/components/molecules/InputImageWithTitle'
import { TextboxWithTitle } from '@/components/molecules/TextboxWithTitle'
import { zodResolver } from '@hookform/resolvers/zod'
import { set, useForm } from 'react-hook-form'
import { useMutatePostCreate } from '@/components/hooks/useMutatePost'
import { useNavigate } from 'react-router-dom'
import { Tiptap } from '@/components/molecules/Tiptap'
import { SelectWithTitle } from '@/components/molecules/SelectWithTitle'
import { useQueryAllTags } from '@/components/hooks/useQueryTag'
import { Tag } from '@/types/tag'
import { useQueryAllCategories } from '@/components/hooks/useQueryCategory'
import { Category } from '@/types/category'

export const PostCreate = () => {
  const { tags } = useQueryAllTags()
  const { categories } = useQueryAllCategories()
  const { adminUserDetail } = useQueryAdminUserDetail()
  const { mutateAsync: addPostMutateAsync } = useMutatePostCreate()

  const navigate = useNavigate()
  const [errorMess, setErrorMess] = useState('')
  const [imageSrc, setImageSrc] = useState()
  const adminMail = localStorage.getItem('admin')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: { ...defaultValuesPostCreate },
    resolver: zodResolver(PostCreateInputSchema)
  })

  // Set default value
  useEffect(() => {
    setValue('authorId', adminUserDetail?.data ? adminUserDetail.data.id : '')
  }, [adminUserDetail])

  // Notification
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [notificationObj, setNotification] = useState<{
    type: NotificationType
    title: string
    message: string
  } | null>(null)

  // Handle mutate add post
  const handleMutateAdd = (postInput: PostCreateInput) => {
    addPostMutateAsync(postInput)
      .then(() => {
        navigate({ pathname: `${import.meta.env.VITE_ADMIN_ROUTE}/posts` })
      })
      .catch((err) => {
        setErrorMess(err.response.data.message)
      })
  }

  // Handle change publish
  const handleChangePublish = (event: { target: { value: { toString: () => string } } }) => {
    setValue('published', event.target.value.toString() === 'true' ? true : false, { shouldDirty: true })
  }

  // Handle set tag ids
  const handleSetTagIds = () => {
    const tagIdsArray: number[] = []
    Array.from(document.querySelectorAll('input[name="tagIdsArray[]"]:checked')).map((el) => {
      tagIdsArray.push(parseInt(el.getAttribute('value') || ''))
    })
    setValue('tagIds', tagIdsArray.join(','), { shouldDirty: true })
  }

  // Handle set cate ids
  const handleSetCateIds = () => {
    const cateIdsArray: number[] = []
    Array.from(document.querySelectorAll('input[name="cateIdsArray[]"]:checked')).map((el) => {
      cateIdsArray.push(parseInt(el.getAttribute('value') || ''))
    })
    setValue('cateIds', cateIdsArray.join(','), { shouldDirty: true })
  }

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
                          <div className="flex w-full max-w-[700px] space-x-5">
                            <TextboxWithTitle
                              className="w-1/2 mb-4"
                              labelProps={{
                                children: <p>Author</p>
                              }}
                              textboxProps={{
                                type: 'text',
                                value: adminMail || '',
                                disabled: true,
                                className: '!text-gray-400'
                              }}
                              isRequired
                            />
                            <div className="w-1/2"></div>
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

                          <div className="flex w-full max-w-[700px] space-x-5">
                            <TextboxWithTitle
                              className="w-1/2 mb-4"
                              labelProps={{
                                children: <p>Meta title</p>
                              }}
                              textboxProps={{ ...register('metaTitle'), type: 'text' }}
                              error={errors.metaTitle?.message}
                              isRequired
                            />

                            <TextboxWithTitle
                              className="w-1/2 mb-4"
                              labelProps={{
                                children: <p>Slug</p>
                              }}
                              textboxProps={{ ...register('slug'), type: 'text' }}
                              error={errors.slug?.message}
                              isRequired
                            />
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 dark:text-white required">Tags</p>
                            <div className="w-full flex flex-wrap gap-2 mt-1">
                              {tags?.data?.data &&
                                tags?.data?.data.map((tag: Tag) => (
                                  <label
                                    htmlFor={`tagId-${tag.id}`}
                                    key={tag.id}
                                    className="w-28 flex flex-col justify-between items-center border rounded-md cursor-pointer p-2"
                                  >
                                    <p className="ml-2 text-sm text-gray-700 dark:text-white">{tag.title}</p>

                                    <input
                                      type="checkbox"
                                      name="tagIdsArray[]"
                                      id={`tagId-${tag.id}`}
                                      value={tag.id}
                                      onChange={handleSetTagIds}
                                      className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer mt-2"
                                    />
                                  </label>
                                ))}
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 dark:text-white required">Categories</p>
                            <div className="w-full flex flex-wrap gap-2 mt-1">
                              {categories?.data?.data &&
                                categories?.data?.data.map((cate: Category) => (
                                  <label
                                    htmlFor={`cateId-${cate.id}`}
                                    key={cate.id}
                                    className="w-28 flex flex-col justify-between items-center border rounded-md cursor-pointer p-2"
                                  >
                                    <p className="ml-2 text-sm text-gray-700 dark:text-white">{cate.title}</p>

                                    <input
                                      type="checkbox"
                                      name="cateIdsArray[]"
                                      id={`cateId-${cate.id}`}
                                      value={cate.id}
                                      onChange={handleSetCateIds}
                                      className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer mt-2"
                                    />
                                  </label>
                                ))}
                            </div>
                          </div>

                          <TextboxWithTitle
                            className=" mb-4"
                            labelProps={{
                              children: <p>Summary</p>
                            }}
                            textboxProps={{ ...register('summary'), type: 'text' }}
                            error={errors.summary?.message}
                            isRequired
                          />

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
                                    content="<strong><h1>Title</h1></strong>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>Nulla vitae elit libero, a pharetra augue. Sed non mauris vitae erat consequat auctor eu in elit. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus.<br/>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies vehicula ut id elit. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Nullam quis risus eget urna mollis ornare vel eu leo. Donec id elit non mi porta gravida at eget metus.
                                    </p>
                                    "
                                    className=""
                                    setNewContent={function (html: string): void {
                                      const parser = new DOMParser()
                                      const doc = parser.parseFromString(html, 'text/html')
                                      const codeTags = doc.querySelectorAll('code')
                                      codeTags.forEach((codeTag) => {
                                        if (!codeTag.classList.contains('language-')) {
                                          codeTag.classList.add('language-typescript')
                                        }
                                      })
                                      // Get html string
                                      const htmlModified = doc.body.innerHTML
                                      setValue('content', htmlModified)
                                    }}
                                  />
                                </div>
                              </div>
                            </label>
                          </div>

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
