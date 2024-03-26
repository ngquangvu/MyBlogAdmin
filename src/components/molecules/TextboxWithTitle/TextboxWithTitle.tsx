import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'
import { Textbox } from '@/components/atoms/Textbox'
import { useId } from 'react';

type Props = {
  className?: string
  labelProps: Omit<ComponentPropsWithoutRef<'label'>, 'htmlFor' | 'className'>
  textboxProps: Omit<ComponentPropsWithRef<'input'>, 'id'>
  description?: string
  error?: string
  isRequired?: boolean
}

export const TextboxWithTitle = ({
  className = '',
  labelProps: { children, ...labelProps },
  textboxProps,
  description,
  error,
  isRequired = false
}: Props) => {
  return (
    <div className={`${className}`}>
      <label {...labelProps}>
        <span
          role="heading"
          className={`text-sm font-medium text-gray-700 dark:text-white ${isRequired ? 'required' : ''}`}
        >
          {children}
        </span>
        <div className="mt-1">
          <Textbox
            {...textboxProps}
            className={textboxProps?.className}
          />
        </div>
      </label>
      <div className='mt-2'>
        {description && (
          <p id={useId()} className="text-sm text-gray-500">
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
