import { z } from "zod/v4"

const MIN = 4
const MAX = 10

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(MIN, { error: `Минимальная длина ${MIN} символа` })
    .max(MAX, { error: `Максимальная длина ${MAX} символов` }),
  rememberMe: z.boolean().optional(),
})

export type LoginInputs = z.infer<typeof loginSchema>
