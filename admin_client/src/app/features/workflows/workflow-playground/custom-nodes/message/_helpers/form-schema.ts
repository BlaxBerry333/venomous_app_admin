import { z } from "zod";

import type { WorkflowsFormValue } from "~/app/features/workflows/_types";
import { createZodSchema, ZOD_I18N_ERROR_CODES } from "~/utils/libs/tools/zod";

export type FormValueType = WorkflowsFormValue.MessageNode;

export const formSchemas = createZodSchema<FormValueType>()(
  z.object({
    description: z.string().min(1, ZOD_I18N_ERROR_CODES.REQUIRED),
    message: z.string().min(1, ZOD_I18N_ERROR_CODES.REQUIRED),
  }),
);
