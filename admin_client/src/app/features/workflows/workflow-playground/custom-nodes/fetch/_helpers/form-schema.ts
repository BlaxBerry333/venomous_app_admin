import { z } from "zod";

import { WorkflowsFormValue } from "~/app/features/workflows/_types";
import { createZodSchema, ZOD_I18N_ERROR_CODES } from "~/utils/libs/tools/zod";

export type FormValueType = WorkflowsFormValue.FetchNode;

export const formSchemas = createZodSchema<FormValueType>()(
  z.object({
    description: z.string().min(1, ZOD_I18N_ERROR_CODES.REQUIRED),
    items: z
      .array(
        z.object({
          method: z.enum([
            WorkflowsFormValue.FetchNodeMethod.GET,
            WorkflowsFormValue.FetchNodeMethod.POST,
            WorkflowsFormValue.FetchNodeMethod.PUT,
            WorkflowsFormValue.FetchNodeMethod.DELETE,
          ]),
          url: z
            .string()
            .min(1, ZOD_I18N_ERROR_CODES.REQUIRED)
            .url(ZOD_I18N_ERROR_CODES.INVALID_URL),
        }),
      )
      .min(1, ZOD_I18N_ERROR_CODES.REQUIRED),
  }),
);
