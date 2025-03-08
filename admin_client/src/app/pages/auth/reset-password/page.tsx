import { PageContent } from "~/ui/components/layouts";
import { AuthLayoutTitle } from "~/ui/templates";
import AuthResetPasswordView from "./view";

export default function AuthResetPasswordPage() {
  return (
    <PageContent helmet={{ title: "Reset Password" }}>
      <AuthLayoutTitle
        title={"Forgot your password?"}
        subtitle={
          "Please enter the email address associated with your account and we'll email you a link to reset your password."
        }
      />

      <AuthResetPasswordView />
    </PageContent>
  );
}
