import type { NamedExoticComponent } from "react";
import { memo } from "react";
import { z } from "zod";

import { BlankFieldWrapper, Link, RHF } from "~/ui/components";
import type { IAuthLoginParams } from "~/utils/libs/apis/types/_auth";
import { AUTH_PATHS } from "~/utils/libs/router";
import { createZodSchema, ZOD_I18N_ERROR_CODES } from "~/utils/libs/tools/zod";

const formSchemas = createZodSchema<IAuthLoginParams>()(
  z.object({
    username: z.string().min(4, ZOD_I18N_ERROR_CODES.TOO_SHORT),
    password: z.string().min(4, ZOD_I18N_ERROR_CODES.TOO_SHORT),
  }),
);

const AuthLoginForm: NamedExoticComponent<{
  defaultValues?: IAuthLoginParams;
  isLoading: boolean;
  onSubmit: (data: IAuthLoginParams) => void;
}> = memo(({ defaultValues = { username: "", password: "" }, isLoading = false, onSubmit }) => {
  return (
    <RHF.FormWithZod zodSchema={formSchemas} defaultValues={defaultValues} onSubmit={onSubmit}>
      {/* Username */}
      <RHF.Text name="username" label="Username" />
      {/* Password */}
      <RHF.Password name="password" label="Password" placeholder="4+ characters" />
      {/* Password Reset */}
      <BlankFieldWrapper>
        <Link to={AUTH_PATHS.resetPassword} sx={{ transform: "translateY(-8px)" }}>
          Forgot Password?
        </Link>
      </BlankFieldWrapper>

      <RHF.Action isLoading={isLoading} />
    </RHF.FormWithZod>
  );
});

export default AuthLoginForm;
