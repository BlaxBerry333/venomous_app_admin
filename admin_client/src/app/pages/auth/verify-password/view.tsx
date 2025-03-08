import type { NamedExoticComponent } from "react";
import { memo, useState } from "react";

import { AuthVerifyPasswordForm } from "~/app/features/auth/auth-verify-password";
import type { IAuthVerifyPasswordParams } from "~/app/types";
import { sleep } from "~/utils/custom/process";

const AuthVerifyPasswordView: NamedExoticComponent = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (formValue: IAuthVerifyPasswordParams) => {
    setIsLoading(true);
    console.log("verify-password", formValue);
    await sleep(1000);
    setIsLoading(false);
  };

  return <AuthVerifyPasswordForm isLoading={isLoading} onSubmit={handleSubmit} />;
});

export default AuthVerifyPasswordView;
