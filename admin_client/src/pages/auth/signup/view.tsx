import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthLayoutPageContainer } from "~/common/components/layouts/AuthLayout";
import { ROUTE_PATHS } from "~/router";

import AuthSignUpForm, {
  type AuthSignUpFormValueType,
} from "~/sections/auth-signup/AuthSignUpForm";

export default function AuthSignUpPageView() {
  const navigate = useNavigate();

  // ----------------------------------------------------------------------------------------------------

  const [isAccountSignUpLoading, setIsAccountSignUpLoading] = useState<boolean>(false);

  const handleAccountLogin = useCallback(
    async (formValue: AuthSignUpFormValueType) => {
      setIsAccountSignUpLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsAccountSignUpLoading(false);

      console.log(formValue);

      navigate(ROUTE_PATHS.dashboard.root, { replace: true });
    },
    [setIsAccountSignUpLoading, navigate],
  );

  return (
    <AuthLayoutPageContainer
      title={"AuthSignUpPage"}
      subtitle={"Already have an account?"}
      subtitleLink={ROUTE_PATHS.auth.login}
      form={
        <AuthSignUpForm
          data={{ email: "", display: "", password: "" }}
          isAccountSignUpLoading={isAccountSignUpLoading}
          handleAccountSignUp={handleAccountLogin}
        />
      }
    />
  );
}
