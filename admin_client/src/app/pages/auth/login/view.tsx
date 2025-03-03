import type { NamedExoticComponent } from "react";
import { memo, useState } from "react";

import { AuthLoginForm } from "~/app/features/auth-login";
import type { IAuthLoginParams } from "~/app/types";
import { sleep } from "~/utils/custom/process";
import { useRouteNavigate } from "~/utils/libs/router";

const AuthLoginView: NamedExoticComponent = memo(() => {
  const { replace } = useRouteNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (formValue: IAuthLoginParams) => {
    setIsLoading(true);
    console.log(formValue);
    await sleep(1000);
    setIsLoading(false);
    replace("/dashboard/analysis");
  };

  return <AuthLoginForm isLoading={isLoading} onSubmit={handleSubmit} />;
});

export default AuthLoginView;
