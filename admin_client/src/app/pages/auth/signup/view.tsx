import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { AuthSignupForm } from "~/app/features/auth/_components";
import { useAuthSignupView } from "~/app/features/auth/_hooks";

const AuthSignupView: NamedExoticComponent = memo(() => {
  const { handleSignup, isSignupLoading } = useAuthSignupView();

  return <AuthSignupForm isLoading={isSignupLoading} onSubmit={handleSignup} />;
});

export default AuthSignupView;
