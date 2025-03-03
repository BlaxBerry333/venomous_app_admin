import type { NamedExoticComponent } from "react";
import { memo, useState } from "react";

import { AuthSignupForm } from "~/app/features/auth-signup";
import type { IAuthSignupParams } from "~/app/types";
import { sleep } from "~/utils/custom/process";
import { useRouteNavigate } from "~/utils/libs/router";

const AuthSignupView: NamedExoticComponent = memo(() => {
  const { replace } = useRouteNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (formValue: IAuthSignupParams) => {
    setIsLoading(true);
    console.log("signup", formValue);
    await sleep(1000);
    setIsLoading(false);
    // replace("/auth/verify");
    replace("/dashboard/analysis");
  };

  return <AuthSignupForm isLoading={isLoading} onSubmit={handleSubmit} />;
});

export default AuthSignupView;
