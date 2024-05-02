import { z } from 'zod'

export const SubscriberCreateInputSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
  isActive: z.boolean(),
  isAgree: z.boolean()
})

export type SubscriberCreateInput = z.infer<typeof SubscriberCreateInputSchema>

export const SubscriberDetailInputSchema: any = z.object({
  email: z.string().min(1, 'Email is required').email(),
  isActive: z.boolean(),
  isAgree: z.boolean()
})

export type SubscriberDetailInput = z.infer<typeof SubscriberDetailInputSchema>

export const defaultValuesSubscriberDetail: SubscriberDetailInput = {
  email: '',
  isActive: true,
  isAgree: true
}

export const defaultValuesSubscriberCreate: SubscriberCreateInput = {
  email: '',
  isActive: true,
  isAgree: true
}
