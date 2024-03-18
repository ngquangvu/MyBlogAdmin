import { Fragment, useEffect, useRef } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PostCreateInput, PostCreateInputSchema, defaultValuesPostCreate } from '@/schema/post'
import { User } from '@/types/user'


type Props = {
  errorMess: string
  onCancel: () => void
  author: User | null

  initialValues?: Partial<PostCreateInput>
  onValid: (values: PostCreateInput) => Promise<void>
}

export default function CreatePostModal({ errorMess, onCancel, author, initialValues, onValid }: Props) {
  const cancelButtonRef = useRef(null)
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
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-[70]" initialFocus={cancelButtonRef} onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <form onSubmit={handleSubmit(onValid)} className="fixed inset-0 z-60 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="w-full sm:flex sm:items-start">
                  <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title as="h1" className="my-3 text-xl font-semibold leading-6 text-gray-900">
                      Create Post
                    </Dialog.Title>

                    <span className="text-red-500">{errorMess}</span>

                    <div className="mt-5">
                      <div className="mb-4">
                        <label className="block text-gray-800 leading-6 text-sm font-semibold mb-1" htmlFor="firstName">
                        Author
                        </label>
                        <h3 className='w-full py-2 px-3 leading-6 mb-1'>{adminMail}</h3>
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-800 leading-6 text-sm font-semibold mb-2" htmlFor="firstName">
                        Title
                        </label>
                        <input
                          {...register('title')}
                          className="appearance-none border rounded w-full py-2 px-3 leading-6 mb-1"
                          id="title"
                          type="text"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-800 leading-6 text-sm font-semibold mb-2" htmlFor="firstName">
                        Meta title
                        </label>
                        <input
                          {...register('metaTitle')}
                          className="appearance-none border rounded w-full py-2 px-3 leading-6 mb-1"
                          id="metaTitle"
                          type="text"
                        />
                        {errors.metaTitle && <span className="text-red-500 text-sm">{errors.metaTitle.message}</span>}
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-800 leading-6 text-sm font-semibold mb-2" htmlFor="firstName">
                        Slug
                        </label>
                        <input
                          {...register('slug')}
                          className="appearance-none border rounded w-full py-2 px-3 leading-6 mb-1"
                          id="slug"
                          type="text"
                        />
                        {errors.slug && <span className="text-red-500 text-sm">{errors.slug.message}</span>}
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-800 leading-6 text-sm font-semibold mb-2" htmlFor="firstName">
                        Summary
                        </label>
                        <input
                          {...register('summary')}
                          className="appearance-none border rounded w-full py-2 px-3 leading-6 mb-1"
                          id="summary"
                          type="text"
                        />
                        {errors.summary && <span className="text-red-500 text-sm">{errors.summary.message}</span>}
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-800 leading-6 text-sm font-semibold mb-2" htmlFor="firstName">
                        Content
                        </label>
                        <input
                          {...register('content')}
                          className="appearance-none border rounded w-full py-2 px-3 leading-6 mb-1"
                          id="content"
                          type="text"
                        />
                        {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-800 leading-6 text-sm font-semibold mb-2" htmlFor="firstName">
                        Thumbnail
                        </label>
                        <input
                          {...register('thumbnail')}
                          className="appearance-none border rounded w-full py-2 px-3 leading-6 mb-1"
                          id="thumbnail"
                          type="text"
                        />
                        {errors.thumbnail && <span className="text-red-500 text-sm">{errors.thumbnail.message}</span>}
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-800 leading-6 text-sm font-semibold mb-2" htmlFor="firstName">
                        Published
                        </label>
                        <input
                          {...register('published')}
                          className="appearance-none border rounded w-full py-2 px-3 leading-6 mb-1"
                          id="published"
                          type="text"
                        />
                        {errors.published && <span className="text-red-500 text-sm">{errors.published.message}</span>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:opacity-80 sm:ml-3 sm:w-auto"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => onCancel()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  )
}
