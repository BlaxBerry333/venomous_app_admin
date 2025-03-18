import { PageContent } from "~/ui/components/layouts";
import { AuthLayoutTitle } from "~/ui/templates";
import { AUTH_PATHS } from "~/utils/libs/router";

import AuthSignupView from "./view";

export default function AuthSignupPage() {
  return (
    <PageContent helmet={{ title: "Signup" }}>
      <AuthLayoutTitle
        title={"Create Account"}
        subtitle={"Already have an account?"}
        subTitleExtraText={"Login"}
        subTitleExtraUrl={AUTH_PATHS.login}
      />

      <AuthSignupView />
    </PageContent>
  );
}
