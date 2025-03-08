import { PageContent } from "~/ui/components/layouts";
import { AuthLayoutTitle } from "~/ui/templates";

import AuthLoginView from "./view";

export default function AuthLoginPage() {
  return (
    <PageContent helmet={{ title: "Login" }}>
      <AuthLayoutTitle
        title={"Login"}
        subtitle={"Don't have an account?"}
        subTitleExtraText={"Create Account"}
        subTitleExtraUrl={"/auth/signup"}
      />

      <AuthLoginView />
    </PageContent>
  );
}
