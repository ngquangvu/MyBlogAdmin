import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

export const Select = forwardRef<HTMLSelectElement, ComponentPropsWithoutRef<'select'>>(function SelectBoxBase(
  { className = '', ...props },
  ref
) {
  return (
    <select className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`} {...props} ref={ref} />
  )
})