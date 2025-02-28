import type { NamedExoticComponent } from "react";
import { memo, startTransition, useCallback, useState } from "react";

import { BaseColor } from "~/ui/_helpers";
import { IconButton } from "~/ui/components/base/iconbutton";
import TextField, { type TextFieldProps } from "./TextField";

export type PasswordProps = TextFieldProps;

const Password: NamedExoticComponent<PasswordProps> = memo(({ ...props }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = useCallback(
    () => startTransition(() => setShowPassword((s) => !s)),
    [setShowPassword],
  );

  const handleMouseDownPassword = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }, []);

  const handleMouseUpPassword = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }, []);

  // ----------------------------------------------------------------------------------------------------

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      endElement={
        <IconButton
          icon={showPassword ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"}
          color={BaseColor.INHERIT}
          sx={{ mr: -1 }}
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          onMouseUp={handleMouseUpPassword}
        />
      }
      {...props}
    />
  );
});

export default Password;
