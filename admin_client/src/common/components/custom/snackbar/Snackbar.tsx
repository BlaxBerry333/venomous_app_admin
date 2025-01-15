import type { FC } from "react";
import { memo } from "react";

import { Icon as Iconify } from "@iconify/react";
import Portal from "@mui/material/Portal";

import { StyledToaster } from "./StyledToaster";
import { toasterClasses } from "./StyledToasterClasses";

const Snackbar: FC = () => {
  return (
    <Portal>
      <StyledToaster
        expand
        gap={12}
        closeButton
        offset={16}
        visibleToasts={4}
        position="bottom-right"
        className={toasterClasses.root}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: toasterClasses.toast,
            icon: toasterClasses.icon,
            // content
            content: toasterClasses.content,
            title: toasterClasses.title,
            description: toasterClasses.description,
            // button
            actionButton: toasterClasses.actionButton,
            cancelButton: toasterClasses.cancelButton,
            closeButton: toasterClasses.closeButton,
            // state
            default: toasterClasses.default,
            info: toasterClasses.info,
            error: toasterClasses.error,
            success: toasterClasses.success,
            warning: toasterClasses.warning,
          },
        }}
        icons={{
          loading: <span>Loading...</span>,
          info: <Iconify icon="solar:info-circle-bold" />,
          success: <Iconify icon="solar:check-circle-bold" />,
          warning: <Iconify icon="solar:danger-triangle-bold" />,
          error: <Iconify icon="solar:danger-bold" />,
        }}
      />
    </Portal>
  );
};

const SnackbarMemo = memo(Snackbar);
export default SnackbarMemo;
