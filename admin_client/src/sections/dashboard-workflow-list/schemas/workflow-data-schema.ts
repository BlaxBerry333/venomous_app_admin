import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 characters long")
    .max(100, "Name must be at most 100 characters long"),
  description: z.string().max(100, "Description must be at most 100 characters long").optional(),
  is_active: z.boolean(),
  is_draft: z.boolean(),
});

export type WorkflowCreateFormValueType = z.infer<typeof formSchema>;

export type WorkflowEditFormValueType = z.infer<typeof formSchema>;
