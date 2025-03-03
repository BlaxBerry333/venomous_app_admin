import type { NamedExoticComponent } from "react";
import { memo } from "react";
import { z } from "zod";
import type { IAuthSignupParams } from "~/app/types";

import { RHF } from "~/ui/components";

const formSchemas = RHF.createZodSchema<IAuthSignupParams>()(
  z.object({
    username: z.string().min(4, "Username must be at least 4 characters long"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
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
        <RHF.Text name="username" label="Username" />
        <RHF.Text name="email" label="Email" />
        <RHF.Password name="password" label="Password" />

        <RHF.Action isLoading={isLoading} />
      </RHF.FormWithZod>
    );
  },
);

export default AuthSignupForm;
