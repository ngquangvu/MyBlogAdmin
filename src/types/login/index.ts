import { z } from 'zod'

export const LoginInputSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required').min(5, 'Password must be at least 5 characters long')
})

export type LoginInput = z.infer<typeof LoginInputSchema>

export const userLoginQueryKey = 'user_login'
export const userQueryKey = 'user'
export const usersQueryKey = 'user'
