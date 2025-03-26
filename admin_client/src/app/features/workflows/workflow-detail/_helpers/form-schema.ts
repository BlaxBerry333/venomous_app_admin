import { z } from "zod";

import { type IWorkflowDataResponse } from "~/app/types/_workflow";
import { createZodSchema, ZOD_I18N_ERROR_CODES } from "~/utils/libs/tools/zod";

export type CreateFormValueType = Pick<IWorkflowDataResponse, "name" | "description">;

export type DetailFormValueType = Pick<IWorkflowDataResponse, "name" | "description" | "is_active">;

export const createFormSchemas = createZodSchema<CreateFormValueType>()(
  z.object({
    name: z.string().min(1, ZOD_I18N_ERROR_CODES.REQUIRED),
    description: z.string().min(1, ZOD_I18N_ERROR_CODES.REQUIRED),
  }),
);

export const detailFormSchemas = createZodSchema<DetailFormValueType>()(
  z.object({
    name: z.string().min(1, ZOD_I18N_ERROR_CODES.REQUIRED),
    description: z.string().min(1, ZOD_I18N_ERROR_CODES.REQUIRED),
    is_active: z.boolean(),
  }),
);
