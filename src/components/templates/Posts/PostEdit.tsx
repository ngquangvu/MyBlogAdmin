import { Suspense, useEffect, useState } from 'react'

import { Loading } from '@/components/atoms/Loading/Loading'
import { defaultValuesPostCreate, PostDetailInput, PostDetailInputSchema } from '@/schema/post'
import { useQueryPostDetail } from '@/components/hooks/useQueryPost'
import { useQueryAdminUserDetail } from '@/components/hooks/useQueryAdmin'
import { Button } from '@/components/atoms/Button'
import { InputImageWithTitle } from '@/components/molecules/InputImageWithTitle'
import { TextboxWithTitle } from '@/components/molecules/TextboxWithTitle'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutatePostUpdate } from '@/components/hooks/useMutatePost'
import { useNavigate, useParams } from 'react-router-dom'
import { SelectWithTitle } from '@/components/molecules/SelectWithTitle'
import { Tiptap } from '@/components/molecules/Tiptap'
import { useQueryAllTags } from '@/components/hooks/useQueryTag'
import { Tag } from '@/types/tag'
import { useQueryAllCategories } from '@/components/hooks/useQueryCategory'
import { Category } from '@/types/category'

export const PostEdit = () => {
  let { id } = useParams()
  const { tags } = useQueryAllTags()
  const { categories } = useQueryAllCategories()
  const { postDetail } = useQueryPostDetail(id ? id : '')
  const { adminUserDetail } = useQueryAdminUserDetail()
  const { mutateAsync: addPostMutateAsync } = useMutatePostUpdate()

  const navigate = useNavigate()
  const [errorMess, setErrorMess] = useState('')
  const [imageSrc, setImageSrc] = useState<string>()
  const [checkedTags, setCheckedTags] = useState<string[]>([''])
  const [checkedCates, setCheckedCates] = useState<string[]>([''])
  const adminMail = localStorage.getItem('admin')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: { ...defaultValuesPostCreate, ...postDetail?.data },
    resolver: zodResolver(PostDetailInputSchema)
  })

  // Set default value
  useEffect(() => {
    setImageSrc(postDetail?.data ? postDetail?.data?.thumbnail : '')
    setCheckedTags(postDetail?.data?.postTags.map((tag) => tag.id.toString()) || [])
    setCheckedCates(postDetail?.data?.postCategories.map((cate) => cate.id.toString()) || [])
  }, [])

  // Handle mutate edit
  const handleMutateEdit = (postInput: PostDetailInput) => {
    addPostMutateAsync(postInput)
      .then(() => {
        navigate({ pathname: `${import.meta.env.VITE_ADMIN_ROUTE}/posts` })
      })
      .catch((err) => {
        setErrorMess(err.response.data.message)
      })
  }

  // Handle change published
  const handleChangePublish = (event: { target: { value: { toString: () => string } } }) => {
    setValue('published', event.target.value.toString() === 'true' ? true : false, { shouldDirty: true })
  }

  // Handle set tagIds
  const handleSetTagIds = () => {
    const tagIdsArray: number[] = []
    Array.from(document.querySelectorAll('input[name="tagIdsArray[]"]:checked')).map((el) => {
      tagIdsArray.push(parseInt(el.getAttribute('value') || ''))
    })
    setCheckedTags(tagIdsArray.map((tagId) => tagId.toString()))
    setValue('tagIds', tagIdsArray.join(','), { shouldDirty: true })
  }

  // Handle set cateIds
  const handleSetCateIds = () => {
    const cateIdsArray: number[] = []
    Array.from(document.querySelectorAll('input[name="cateIdsArray[]"]:checked')).map((el) => {
      cateIdsArray.push(parseInt(el.getAttribute('value') || ''))
    })

    setCheckedCates(cateIdsArray.map((cateId) => cateId.toString()))
    setValue('cateIds', cateIdsArray.join(','), { shouldDirty: true })
  }

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

                          <div className="flex w-full max-w-[700px] space-x-5">
                            <TextboxWithTitle
                              className="w-1/2 mb-4"
                              labelProps={{
                                children: <p>Meta title</p>
                              }}
                              textboxProps={{ ...register('metaTitle'), type: 'text' }}
                              error={errors.metaTitle?.message?.toString()}
                              isRequired
                            />
                            <TextboxWithTitle
                              className="w-1/2 mb-4"
                              labelProps={{
                                children: <p>Slug</p>
                              }}
                              textboxProps={{ ...register('slug'), type: 'text' }}
                              error={errors.slug?.message?.toString()}
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
                                      checked={checkedTags?.includes(tag.id.toString())}
                                      onChange={handleSetTagIds}
                                      className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer mt-2"
                                    />
                                    <input type="hidden" name="tagIds" />
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
                                      checked={checkedCates?.includes(cate.id.toString())}
                                      onChange={handleSetCateIds}
                                      className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer mt-2"
                                    />
                                    <input type="hidden" name="cateIds" />
                                  </label>
                                ))}
                            </div>
                          </div>

                          <TextboxWithTitle
                            className="mb-4"
                            labelProps={{
                              children: <p>Summary</p>
                            }}
                            textboxProps={{ ...register('summary'), type: 'text' }}
                            error={errors.summary?.message?.toString()}
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
                                    content={postDetail?.data?.content || ''}
                                    className=""
                                    setNewContent={(html: string) => {
                                      setValue('content', html)
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
