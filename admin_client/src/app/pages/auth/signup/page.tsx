import { PageContent } from "~/ui/components/layouts";
import { AuthLayoutTitle } from "~/ui/templates";

import AuthSignupView from "./view";

export default function AuthSignupPage() {
  return (
    <PageContent helmet={{ title: "Signup" }}>
      <AuthLayoutTitle
        title={"Create Account"}
        subtitle={"Already have an account?"}
        subTitleExtraText={"Login"}
        subTitleExtraUrl={"/auth/login"}
      />

      <AuthSignupView />
    </PageContent>
  );
}
