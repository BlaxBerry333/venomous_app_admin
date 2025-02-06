import type { NamedExoticComponent } from "react";
import { memo, Suspense, useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CustomConfirmDialog from "~/common/components/custom/dialogs/CustomConfirmDialog";
import { CustomForm, CustomFormField } from "~/common/components/custom/form-fields";
import { toast } from "~/common/components/custom/snackbar";
import useBoolean from "~/common/hooks/useBoolean";
import { useLoginNoteApp } from "~/services/apis-hooks/notes";
import { getParsedAPIErrorResponse, setAccessTokenAsStoredOfNoteApp } from "~/services/helpers";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

type FormValueType = z.infer<typeof formSchema>;

const AuthenticationLoginDialog: NamedExoticComponent<{
  title?: string;
  refetch: undefined | (() => void);
}> = memo(({ title = "Please login to get AccessToken", refetch }) => {
  const dialogHandler = useBoolean(true);

  // ----------------------------------------------------------------------------------------------------

  const { mutateAsync: handleAuthenticationLogin, isPending: isAuthenticating } = useLoginNoteApp();

  // ----------------------------------------------------------------------------------------------------

  const form = useForm<FormValueType>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  const isDisabledSubmit: boolean = !form.formState.isValid || isAuthenticating;

  const handleFormSubmit = useCallback(async () => {
    try {
      const formValue = form.getValues();
      await handleAuthenticationLogin(formValue).then((res) => {
        setAccessTokenAsStoredOfNoteApp(res.data!.token);
        toast.success(res.data?.message);
        dialogHandler.setFalse();
        refetch?.();
      });
    } catch (error) {
      const { code, message } = getParsedAPIErrorResponse(error as AxiosError);
      toast.error(`${code}: ${message}`);
    }
  }, [dialogHandler, form, handleAuthenticationLogin, refetch]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <Suspense>
      <CustomConfirmDialog
        isRelativeDialog
        isOpen={dialogHandler.value}
        onClose={dialogHandler.setFalse}
        onConfirm={handleFormSubmit}
        isConfirming={isAuthenticating}
        disabledConfirm={isDisabledSubmit}
        disableCancel={isAuthenticating}
        title={title}
        content={
          <>
            <CustomForm<FormValueType> form={form} onSubmit={handleFormSubmit}>
              <CustomFormField.Text name="email" label={"NoteApp Account Email"} />
              <CustomFormField.Text name="password" label={"Password"} />
            </CustomForm>
          </>
        }
      />
    </Suspense>
  );
});

export default AuthenticationLoginDialog;
