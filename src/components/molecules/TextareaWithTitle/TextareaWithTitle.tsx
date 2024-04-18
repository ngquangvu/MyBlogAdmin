import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'
import { useId } from 'react'
import { Textarea } from '@/components/atoms/Textarea'

type Props = {
  className?: string
  labelProps: Omit<ComponentPropsWithoutRef<'label'>, 'htmlFor' | 'className'>
  textareaProps: Omit<ComponentPropsWithRef<'textarea'>, 'id'>
  description?: string
  error?: string
  isRequired?: boolean
}

export const TextareaWithTitle = ({
  className = '',
  labelProps: { children, ...labelProps },
  textareaProps,
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
          <Textarea {...textareaProps} className={textareaProps?.className} />
        </div>
      </label>
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
