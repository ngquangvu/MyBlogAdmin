import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'
import { useId } from 'react'
import { Select } from '@/components/atoms/Select'

type Props = {
  className?: string
  labelProps: Omit<ComponentPropsWithoutRef<'label'>, 'htmlFor' | 'className'>
  options?: { value: string; name: string }[]
  selectProps: ComponentPropsWithRef<'select'>
  description?: string
  error?: string
  isRequired?: boolean
}

export const SelectWithTitle = ({
  className = '',
  labelProps: { children, ...labelProps },
  options,
  selectProps: { value, ...selectProps },
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
          <Select className="relative" value={value} {...selectProps} >
            {options?.map((items, key) => (
              <option className={`font-bold`} key={key} value={items.value}>
                {items.name}
              </option>
            ))}
          </Select>
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
