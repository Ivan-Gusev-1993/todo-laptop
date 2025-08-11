import { z } from "zod/v4"

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.iso.datetime({ local: true }),
  order: z.int(),
})

export type Todolist = z.infer<typeof todolistSchema>
