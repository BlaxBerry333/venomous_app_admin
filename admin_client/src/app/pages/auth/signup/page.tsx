import { PageContent } from "~/ui/components/layouts";
import { AuthLayoutTitle } from "~/ui/templates";
import { useTranslation } from "~/utils/libs/i18n";
import { AUTH_PATHS } from "~/utils/libs/router";
import AuthSignupView from "./view";

export default function AuthSignupPage() {
  const { t } = useTranslation("auth");

  return (
    <PageContent
      helmet={{ title: t("meta.SIGNUP_TITLE"), description: t("meta.SIGNUP_DESCRIPTION") }}
    >
      <AuthLayoutTitle
        title={t("titles.CREATE_ACCOUNT")}
        subtitle={t("messages.ALREADY_HAVE_ACCOUNT")}
        subTitleExtraText={t("messages.LOGIN_ACCOUNT")}
        subTitleExtraUrl={AUTH_PATHS.login}
      />

      <AuthSignupView />
    </PageContent>
  );
}
