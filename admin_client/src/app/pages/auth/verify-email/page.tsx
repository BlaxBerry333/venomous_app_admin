import { PageContent } from "~/ui/components/layouts";
import { AuthLayoutTitle } from "~/ui/templates";
import AuthVerifyPasswordView from "./view";

export default function AuthVerifyPasswordPage() {
  return (
    <PageContent helmet={{ title: "Verify Password" }}>
      <AuthLayoutTitle
        title={"Please check your email"}
        subtitle={
          "We've emailed a 6-digit confirmation code. Please enter the code in the box below to verify your email."
        }
      />

      <AuthVerifyPasswordView />
    </PageContent>
  );
}
