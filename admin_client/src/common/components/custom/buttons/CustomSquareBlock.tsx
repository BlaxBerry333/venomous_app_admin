import type { FC } from "react";
import { memo } from "react";

import type { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import MuiButton from "@mui/material/Button";

const CustomSquareBlock: FC<MuiButtonProps> = (props) => {
  return (
    <MuiButton
      color="inherit"
      sx={{ minHeight: 32, minWidth: 32, padding: "6px", borderRadius: "8px", ...props.sx }}
      {...props}
    />
  );
};

export default memo(CustomSquareBlock);
