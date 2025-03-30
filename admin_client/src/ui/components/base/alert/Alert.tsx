import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiAlert, { type AlertProps as MuiAlertProps } from "@mui/material/Alert";

type AlertProps = PropsWithChildren<MuiAlertProps>;

const Alert: NamedExoticComponent<AlertProps> = memo(({ children, ...props }) => {
  return (
    <MuiAlert severity="info" {...props}>
      {children}
    </MuiAlert>
  );
});

export default Alert;
