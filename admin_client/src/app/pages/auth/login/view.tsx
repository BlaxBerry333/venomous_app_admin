import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { AuthLoginForm } from "~/app/features/auth/_components";
import { useAuthLoginView } from "~/app/features/auth/_hooks";

const AuthLoginView: NamedExoticComponent = memo(() => {
  const { handleLogin, isLoginLoading } = useAuthLoginView();

  return <AuthLoginForm isLoading={isLoginLoading} onSubmit={handleLogin} />;
});

export default AuthLoginView;
