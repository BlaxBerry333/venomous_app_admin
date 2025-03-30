import { PageContent } from "~/ui/components/layouts";
import { AuthLayoutTitle } from "~/ui/templates";
import { useTranslation } from "~/utils/libs/i18n";
import AuthVerifyPasswordView from "./view";

export default function AuthVerifyEmailPage() {
  const { t } = useTranslation("auth");

  return (
    <PageContent
      helmet={{
        title: t("meta.VERIFY_MAIL_TITLE"),
        description: t("meta.VERIFY_MAIL_DESCRIPTION"),
      }}
    >
      <AuthLayoutTitle
        title={t("titles.VERIFY_MAIL")}
        subtitle={t("messages.PLEASE_CHECK_RVERIFY_EMIAL")}
      />

      <AuthVerifyPasswordView />
    </PageContent>
  );
}
