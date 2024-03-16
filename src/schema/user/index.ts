import { z } from 'zod'

export const UserCreateInputSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email(),
    firstName: z.string().min(1, 'First name is required')
    .min(5, 'First name must be at least 5 characters long')
    .optional(),
    lastName: z.string().min(1, 'Last name is required')
    .min(5, 'Last name must be at least 5 characters long')
    .optional(),
    password: z
      .string()
      .min(1, 'Password is required')
      .regex(/^([a-zA-Z0-9@#\$%&?!]+)$/, 'Special characters are not allowed in the password')
      .min(5, 'Password must be at least 5 characters long')
      .max(32, 'Password must be at most 32 characters long'),
    confirmPassword: z
      .string()
      .min(1, 'Confirm password is required')
      .min(5, 'Confirm password must be at least 5 characters long')
      .optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Confirm password must match the password',
    path: ['confirmPassword'] // path of error
  })

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>

export const UserDetailInputSchema: any = z
  .object({
    email: z.string().min(1, 'Email is required').email(),
    firstName: z.string().min(1, 'First name is required')
    .min(5, 'First name must be at least 5 characters long')
    .optional(),
    lastName: z.string().min(1, 'Last name is required')
    .min(5, 'Last name must be at least 5 characters long')
    .optional()
  })

export type UserDetailInput = z.infer<typeof UserDetailInputSchema>

export const defaultValuesUserDetail: UserDetailInput = {
  email: '',
  password: '',
  confirmPassword: ''
}

export const defaultValuesUserCreate: UserCreateInput = {
  email: '',
  password: '',
  confirmPassword: ''
}
