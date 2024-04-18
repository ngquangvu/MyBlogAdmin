import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<'textarea'>>(function TextboxBase(
  { className = '', ...props },
  ref
) {
  return (
    <textarea
      {...props}
      className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      ref={ref}
    />
  )
})