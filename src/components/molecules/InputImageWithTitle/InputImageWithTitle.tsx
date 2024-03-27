import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'
import { Textbox } from '@/components/atoms/Textbox'
import { useId, useState } from 'react'

type Props = {
  className?: string
  labelProps: Omit<ComponentPropsWithoutRef<'h3'>, 'htmlFor' | 'className'>
  textboxProps: Omit<ComponentPropsWithRef<'input'>, 'id'>
  imageSrc?: string
  description?: string
  error?: string
  isRequired?: boolean
}

export const InputImageWithTitle = ({
  className = '',
  labelProps: { children, ...labelProps },
  textboxProps,
  imageSrc,
  description,
  error,
  isRequired = false
}: Props) => {
  return (
    <div className={`${className}`}>
      <h3 {...labelProps}>
        <span
          role="heading"
          className={`text-sm font-medium text-gray-700 dark:text-white ${isRequired ? 'required' : ''}`}
        >
          {children}
        </span>

        <div className="block w-full my-1 p-1 bg-gray-50 dark:bg-gray-700  border border-gray-300 dark:border-gray-600 rounded-md">
          {imageSrc && (
            <div className="flex p-2.5 pb-1">
              <img src={imageSrc} className="w-24 h-auto" alt="" />
            </div>
          )}
          <Textbox
            {...textboxProps}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className={`${textboxProps?.className} w-full border-none bg-inherit hover:cursor-pointer p-0.5 m-0`}
          />
        </div>
      </h3>
      <div className="mt-2">
        {description && (
          <p id={useId()} className="text-sm text-gray-500 dark:text-white">
            {description}
          </p>
        )}
        {error && (
          <p id={useId()} className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
