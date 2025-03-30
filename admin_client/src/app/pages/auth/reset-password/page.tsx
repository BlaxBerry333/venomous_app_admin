import { PageContent } from "~/ui/components/layouts";
import { AuthLayoutTitle } from "~/ui/templates";
import { useTranslation } from "~/utils/libs/i18n";
import AuthResetPasswordView from "./view";

export default function AuthResetPasswordPage() {
  const { t } = useTranslation("auth");

  return (
    <PageContent
      helmet={{
        title: t("meta.FORGET_PASSWORD_TITLE"),
        description: t("meta.FORGET_PASSWORD_DESCRIPTION"),
      }}
    >
      <AuthLayoutTitle
        title={t("titles.FORGET_PASSWORD")}
        subtitle={t("messages.PLEASE_CHECK_RESET_PASSWORD_EMIAL")}
      />

      <AuthResetPasswordView />
    </PageContent>
  );
}
