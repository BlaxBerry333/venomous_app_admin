import type { NamedExoticComponent } from "react";
import { memo, useCallback } from "react";

import type { Theme as MuiTheme } from "@mui/material/styles";
import {
  GridActionsCellItem as MuiGridActionsCellItem,
  type GridActionsCellItemProps as MuiGridActionsCellItemProps,
} from "@mui/x-data-grid";

import { BaseColor } from "~/ui/_helpers";

type TabItemActionProps = Omit<MuiGridActionsCellItemProps, "onClick"> & {
  onClick?: () => void;
  color?: BaseColor;
};

const TabItemAction: NamedExoticComponent<TabItemActionProps> = memo(
  ({ label, color = BaseColor.INHERIT, onClick }) => {
    const getColor = useCallback(
      (palette: MuiTheme["palette"]): string => {
        return color === BaseColor.INHERIT
          ? "inherit"
          : ((palette[color as keyof typeof palette] as { main: string }).main ?? "inherit");
      },
      [color],
    );

    return (
      <MuiGridActionsCellItem
        key={label}
        label={label}
        showInMenu
        sx={{
          typography: "body2",
          color: ({ palette }) => getColor(palette),
          "& svg": { color: ({ palette }) => getColor(palette) },
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      />
    );
  },
);

export default TabItemAction;
