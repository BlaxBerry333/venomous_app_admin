import type { NamedExoticComponent } from "react";
import { memo, useState } from "react";

import { AuthVerifyEmailForm } from "~/app/features/auth/_components";
import type { IAuthVerifyPasswordParams } from "~/app/types";
import { sleep } from "~/utils/custom/process";

const AuthVerifyEmailView: NamedExoticComponent = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (formValue: IAuthVerifyPasswordParams) => {
    setIsLoading(true);
    console.log("verify-password", formValue);
    await sleep(1000);
    setIsLoading(false);
  };

  return <AuthVerifyEmailForm isLoading={isLoading} onSubmit={handleSubmit} />;
});

export default AuthVerifyEmailView;
