import { z } from "zod";

import { IWorkflowDataType, type IWorkflowDataResponse } from "~/utils/libs/apis/types/_workflow";
import { createZodSchema, ZOD_I18N_ERROR_CODES } from "~/utils/libs/tools/zod";

export type CreateFormValueType = Pick<IWorkflowDataResponse, "name" | "description" | "type">;

export type DetailFormValueType = Pick<
  IWorkflowDataResponse,
  "name" | "description" | "type" | "isActive"
>;

const commonSchema = {
  name: z.string().min(1, ZOD_I18N_ERROR_CODES.REQUIRED),
  description: z.string(),
  type: z.nativeEnum(IWorkflowDataType, {
    errorMap: () => ({ message: ZOD_I18N_ERROR_CODES.INVALID_SELECT_OPTION }),
  }),
};

export const createFormSchemas = createZodSchema<CreateFormValueType>()(
  z.object({
    ...commonSchema,
  }),
);

export const detailFormSchemas = createZodSchema<DetailFormValueType>()(
  z.object({
    ...commonSchema,
    isActive: z.boolean(),
  }),
);
