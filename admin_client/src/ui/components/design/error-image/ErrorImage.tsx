import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { useTheme } from "@mui/material/styles";

import { getColor } from "~/ui/_helpers";
import Error403 from "./ErrorImage403";
import Error404 from "./ErrorImage404";
import Error500 from "./ErrorImage500";

export enum ErrorCode {
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

const ErrorImage: NamedExoticComponent<{
  errorCode: ErrorCode;
}> = memo(({ errorCode }) => {
  const muiTheme = useTheme();
  const PRIMARY_MAIN = muiTheme.palette.primary.main;
  const PRIMARY_LIGHT = muiTheme.palette.primary.light;
  const PRIMARY_LIGHTER = getColor(PRIMARY_MAIN).lighter();
  const PRIMARY_DARK = muiTheme.palette.primary.dark;
  const PRIMARY_DARKER = getColor(PRIMARY_MAIN).darker();

  return (
    <>
      {errorCode === ErrorCode.FORBIDDEN && (
        <Error403
          PRIMARY_MAIN={PRIMARY_MAIN}
          PRIMARY_LIGHT={PRIMARY_LIGHT}
          PRIMARY_LIGHTER={PRIMARY_LIGHTER}
          PRIMARY_DARK={PRIMARY_DARK}
          PRIMARY_DARKER={PRIMARY_DARKER}
        />
      )}

      {errorCode === ErrorCode.NOT_FOUND && (
        <Error404
          PRIMARY_MAIN={PRIMARY_MAIN}
          PRIMARY_LIGHT={PRIMARY_LIGHT}
          PRIMARY_LIGHTER={PRIMARY_LIGHTER}
          PRIMARY_DARK={PRIMARY_DARK}
          PRIMARY_DARKER={PRIMARY_DARKER}
        />
      )}

      {errorCode === ErrorCode.SERVER_ERROR && (
        <Error500
          PRIMARY_MAIN={PRIMARY_MAIN}
          PRIMARY_LIGHT={PRIMARY_LIGHT}
          PRIMARY_LIGHTER={PRIMARY_LIGHTER}
          PRIMARY_DARK={PRIMARY_DARK}
          PRIMARY_DARKER={PRIMARY_DARKER}
        />
      )}
    </>
  );
});

export default ErrorImage;
