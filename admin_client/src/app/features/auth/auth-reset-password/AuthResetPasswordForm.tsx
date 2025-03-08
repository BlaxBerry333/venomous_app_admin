import type { NamedExoticComponent } from "react";
import { memo } from "react";
import { z } from "zod";

import type { IAuthResetPasswordParams } from "~/app/types";
import { RHF } from "~/ui/components";
import { createZodSchema, ZOD_I18N_ERROR_CODES } from "~/utils/libs/tools/zod";

const formSchemas = createZodSchema<IAuthResetPasswordParams>()(
  z.object({
    email: z.string().email(ZOD_I18N_ERROR_CODES.INVALID_EMAIL_ADDRESS),
  }),
);

const AuthResetPasswordForm: NamedExoticComponent<{
  defaultValues?: IAuthResetPasswordParams;
  isLoading: boolean;
  onSubmit: (data: IAuthResetPasswordParams) => void;
}> = memo(({ defaultValues = { email: "" }, isLoading = false, onSubmit }) => {
  return (
    <RHF.FormWithZod zodSchema={formSchemas} defaultValues={defaultValues} onSubmit={onSubmit}>
      {/* Email Address */}
      <RHF.Text name="email" label="Email" />

      <RHF.Action hideResetButton isLoading={isLoading} submitButtonText="Send Request" />
    </RHF.FormWithZod>
  );
});

export default AuthResetPasswordForm;
