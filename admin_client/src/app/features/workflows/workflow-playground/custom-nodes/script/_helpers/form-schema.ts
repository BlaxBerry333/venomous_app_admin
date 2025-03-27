import { z } from "zod";

import { WorkflowsFormValue } from "~/app/features/workflows/_types";
import { createZodSchema, ZOD_I18N_ERROR_CODES } from "~/utils/libs/tools/zod";

export type FormValueType = WorkflowsFormValue.ScriptNode;

export const formSchemas = createZodSchema<FormValueType>()(
  z.object({
    description: z.string().min(1, ZOD_I18N_ERROR_CODES.REQUIRED),
    language: z.string().min(1, ZOD_I18N_ERROR_CODES.REQUIRED),
    code: z.string().min(4, ZOD_I18N_ERROR_CODES.TOO_SHORT),
  }),
);
