import { z } from "zod/v4"

const MIN = 4

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(MIN, { error: `Минимальная длина ${MIN} символа` }),
  rememberMe: z.boolean(),
})
