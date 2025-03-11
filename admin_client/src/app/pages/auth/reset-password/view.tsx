import type { NamedExoticComponent } from "react";
import { memo, useState } from "react";

import { AuthResetPasswordForm } from "~/app/features/auth/_components";
import type { IAuthResetPasswordParams } from "~/app/types";
import { sleep } from "~/utils/custom/process";

const AuthResetPasswordView: NamedExoticComponent = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (formValue: IAuthResetPasswordParams) => {
    setIsLoading(true);
    console.log("reset-password", formValue);
    await sleep(1000);
    setIsLoading(false);
  };

  return <AuthResetPasswordForm isLoading={isLoading} onSubmit={handleSubmit} />;
});

export default AuthResetPasswordView;
