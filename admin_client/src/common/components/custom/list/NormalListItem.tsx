import type { FC, ReactNode } from "react";
import { memo, useMemo } from "react";

import MuiListItemButton, {
  type ListItemButtonProps as MuiListItemButtonProps,
} from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText, {
  type ListItemTextProps as MuiListItemTextProps,
} from "@mui/material/ListItemText";

export type CustomListItemProps = {
  MuiListItemButtonProps?: MuiListItemButtonProps;
  MuiListItemTextProps?: MuiListItemTextProps;
  icon?: ReactNode;
  end?: ReactNode;
};

const CustomNormalListItem: FC<CustomListItemProps> = ({
  MuiListItemButtonProps,
  MuiListItemTextProps,
  icon,
  end,
}) => {
  const isSelected = useMemo<boolean>(
    () => !!MuiListItemButtonProps?.selected,
    [MuiListItemButtonProps?.selected],
  );

  return (
    <MuiListItemButton component="li" {...MuiListItemButtonProps}>
      {icon && (
        <MuiListItemIcon
          sx={{
            svg: {
              fontSize: "1.2em",
              color: ({ palette }) => {
                const isDarkMode = palette.mode === "dark";
                const activeColor = isDarkMode ? palette.primary.light : palette.primary.main;
                return isSelected ? activeColor : palette.text.secondary;
              },
            },
          }}
        >
          {icon}
        </MuiListItemIcon>
      )}

      <MuiListItemText
        primaryTypographyProps={{
          variant: "subtitle2",
          noWrap: true,
          width: 0.8,
          sx: {
            color: ({ palette }) => {
              const isDarkMode = palette.mode === "dark";
              const activeColor = isDarkMode ? palette.primary.light : palette.primary.main;
              return isSelected ? activeColor : palette.text.secondary;
            },
            ...MuiListItemTextProps?.primaryTypographyProps?.sx,
          },
          ...MuiListItemTextProps?.primaryTypographyProps,
        }}
        {...MuiListItemTextProps}
      />

      {end}
    </MuiListItemButton>
  );
};

export default memo(CustomNormalListItem);
