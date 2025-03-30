import { PageContent } from "~/ui/components/layouts";
import { AuthLayoutTitle } from "~/ui/templates";
import { useTranslation } from "~/utils/libs/i18n";
import { AUTH_PATHS } from "~/utils/libs/router";
import AuthLoginView from "./view";

export default function AuthLoginPage() {
  const { t } = useTranslation("auth");

  return (
    <PageContent
      helmet={{ title: t("meta.LOGIN_TITLE"), description: t("meta.LOGIN_DESCRIPTION") }}
    >
      <AuthLayoutTitle
        title={t("titles.LOGIN")}
        subtitle={t("messages.DONOT_HAVE_ACCOUNT")}
        subTitleExtraText={t("messages.CREATE_ACCOUNT")}
        subTitleExtraUrl={AUTH_PATHS.signup}
      />

      <AuthLoginView />
    </PageContent>
  );
}
