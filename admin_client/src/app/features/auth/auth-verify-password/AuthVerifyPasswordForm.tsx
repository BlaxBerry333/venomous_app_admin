import type { NamedExoticComponent } from "react";
import { memo } from "react";
import { z } from "zod";

import type { IAuthVerifyPasswordParams } from "~/app/types";
import { RHF } from "~/ui/components";
import { createZodSchema, ZOD_I18N_ERROR_CODES } from "~/utils/libs/tools/zod";

const formSchemas = createZodSchema<IAuthVerifyPasswordParams>()(
  z.object({
    email: z.string().email(ZOD_I18N_ERROR_CODES.INVALID_EMAIL_ADDRESS),
    code: z.string().min(6, ZOD_I18N_ERROR_CODES.TOO_SHORT),
  }),
);

const AuthVerifyPasswordForm: NamedExoticComponent<{
  defaultValues?: IAuthVerifyPasswordParams;
  isLoading: boolean;
  onSubmit: (data: IAuthVerifyPasswordParams) => void;
}> = memo(({ defaultValues = { email: "" }, isLoading = false, onSubmit }) => {
  return (
    <RHF.FormWithZod zodSchema={formSchemas} defaultValues={defaultValues} onSubmit={onSubmit}>
      {/* Email Address */}
      <RHF.Text name="email" label="Email" />
      {/* Verification Code */}
      <RHF.OneTimeInput name="code" />

      <RHF.Action hideResetButton isLoading={isLoading} submitButtonText="Verify" />
    </RHF.FormWithZod>
  );
});

export default AuthVerifyPasswordForm;
