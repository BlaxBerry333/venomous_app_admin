import type { NamedExoticComponent } from "react";
import { memo } from "react";
import { z } from "zod";

import { RHF } from "~/ui/components";
import type { IAuthResetPasswordParams } from "~/utils/libs/apis/types/_auth";
import { useTranslation } from "~/utils/libs/i18n";
import { createZodSchema, ZOD_I18N_ERROR_CODES } from "~/utils/libs/tools/zod";

const formSchemas = createZodSchema<IAuthResetPasswordParams>()(
  z.object({
    email: z.string().email(ZOD_I18N_ERROR_CODES.INVALID_EMAIL_ADDRESS),
  }),
);

const AuthResetPasswordForm: NamedExoticComponent<{
  defaultValues?: IAuthResetPasswordParams;
  isLoading: boolean;
  onSubmit: (data: IAuthResetPasswordParams) => void;
}> = memo(({ defaultValues = { email: "" }, isLoading = false, onSubmit }) => {
  const { t } = useTranslation("auth");

  return (
    <RHF.FormWithZod zodSchema={formSchemas} defaultValues={defaultValues} onSubmit={onSubmit}>
      {/* Email Address */}
      <RHF.Text name="email" label={t("labels.EMAIL")} />

      <RHF.Action
        hideResetButton
        isLoading={isLoading}
        submitButtonText={t("buttons.SEND_RESET_PASSWORD_EMIAL")}
      />
    </RHF.FormWithZod>
  );
});

export default AuthResetPasswordForm;
