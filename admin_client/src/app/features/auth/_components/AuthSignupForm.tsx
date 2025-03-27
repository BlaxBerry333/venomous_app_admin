import type { NamedExoticComponent } from "react";
import { memo } from "react";
import { z } from "zod";

import { RHF } from "~/ui/components";
import type { IAuthSignupParams } from "~/utils/libs/apis/types/_auth";
import { createZodSchema, ZOD_I18N_ERROR_CODES } from "~/utils/libs/tools/zod";

const formSchemas = createZodSchema<IAuthSignupParams>()(
  z.object({
    username: z.string().min(4, ZOD_I18N_ERROR_CODES.TOO_SHORT),
    email: z.string().email(ZOD_I18N_ERROR_CODES.INVALID_EMAIL_ADDRESS),
    password: z.string().min(4, ZOD_I18N_ERROR_CODES.TOO_SHORT),
  }),
);

const AuthSignupForm: NamedExoticComponent<{
  defaultValues?: IAuthSignupParams;
  isLoading: boolean;
  onSubmit: (data: IAuthSignupParams) => void;
}> = memo(
  ({ defaultValues = { username: "", email: "", password: "" }, isLoading = false, onSubmit }) => {
    return (
      <RHF.FormWithZod zodSchema={formSchemas} defaultValues={defaultValues} onSubmit={onSubmit}>
        {/* Username */}
        <RHF.Text name="username" label="Username" placeholder="4+ characters" />
        {/* Email Address */}
        <RHF.Text name="email" label="Email" />
        {/* Password */}
        <RHF.Password name="password" label="Password" placeholder="4+ characters" />

        <RHF.Action isLoading={isLoading} />
      </RHF.FormWithZod>
    );
  },
);

export default AuthSignupForm;
