import type { NamedExoticComponent } from "react";
import { memo } from "react";

import Portal from "@mui/material/Portal";

import { ButtonColor } from "~/ui/components/base/button";
import { Icon } from "~/ui/components/customs/icons";
import { StyledToaster } from "./StyledToaster";
import { toasterClasses } from "./StyledToasterClasses";

export enum SnackbarPosition {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
}

const Snackbar: NamedExoticComponent<{
  position?: SnackbarPosition;
}> = memo(({ position = SnackbarPosition.BOTTOM_RIGHT }) => {
  return (
    <Portal>
      <StyledToaster
        expand
        gap={12}
        closeButton
        offset={16}
        visibleToasts={4}
        position={position}
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
          loading: <Icon icon="eos-icons:bubble-loading" color={ButtonColor.INHERIT} />,
          info: <Icon icon="solar:info-circle-bold" color={ButtonColor.INHERIT} />,
          success: <Icon icon="solar:check-circle-bold" color={ButtonColor.SUCCESS} />,
          warning: <Icon icon="solar:danger-triangle-bold" color={ButtonColor.WARNING} />,
          error: <Icon icon="solar:danger-bold" color={ButtonColor.ERROR} />,
        }}
      />
    </Portal>
  );
});

export default Snackbar;
