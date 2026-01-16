import { z } from 'zod'

export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => /^5[0-9]{8}$/.test(val),
      "Must start with 5 and be exactly 9 digits"
    ),
})

export type PhoneValues = z.infer<typeof phoneSchema>
export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .refine(
      (val) => /^[0-9]{6}$/.test(val),
      "Must be exactly 6 digits"
    ),
})
export type OtpValues = z.infer<typeof otpSchema>
