import type { NamedExoticComponent } from "react";
import { memo } from "react";
import { z } from "zod";

import type { IAuthLoginParams } from "~/app/types";
import { BlankFieldWrapper, Link, RHF } from "~/ui/components";

const formSchemas = RHF.createZodSchema<IAuthLoginParams>()(
  z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
  }),
);

const AuthLoginForm: NamedExoticComponent<{
  defaultValues?: IAuthLoginParams;
  isLoading: boolean;
  onSubmit: (data: IAuthLoginParams) => void;
}> = memo(({ defaultValues = { email: "", password: "" }, isLoading = false, onSubmit }) => {
  return (
    <RHF.FormWithZod zodSchema={formSchemas} defaultValues={defaultValues} onSubmit={onSubmit}>
      <RHF.Select
        name="email"
        label="Email"
        options={[{ title: "admin@admin.com", value: "admin@admin.com" }]}
      />
      <RHF.Password name="password" label="Password" />

      <BlankFieldWrapper>
        <Link to="/auth/forgot-password" sx={{ transform: "translateY(-8px)" }}>
          Forgot Password?
        </Link>
      </BlankFieldWrapper>

      <RHF.Action isLoading={isLoading} />
    </RHF.FormWithZod>
  );
});

export default AuthLoginForm;
