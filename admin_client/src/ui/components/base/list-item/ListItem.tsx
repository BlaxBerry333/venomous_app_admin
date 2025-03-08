import type { NamedExoticComponent, ReactNode } from "react";
import { memo } from "react";

import MuiListItem, { type ListItemProps as MuiListItemProps } from "@mui/material/ListItem";
import MuiListItemButton, {
  type ListItemButtonProps as MuiListItemButtonProps,
} from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";

import { BaseColor } from "~/ui/_helpers";
import { Icon, type IconProps } from "~/ui/components/customs/icons";

export enum ListItemSize {
  SMALL = "small",
  LARGE = "large",
}

export type ListItemProps<V = string | number> = Omit<
  MuiListItemProps,
  "onClick" | "value" | "color"
> &
  Omit<MuiListItemButtonProps, "color"> & {
    title: string;
    subtitle?: string;
    icon?: IconProps["icon"];
    selected?: boolean;
    onClick?: MuiListItemButtonProps["onClick"];
    endElement?: ReactNode;
    iconColor?: BaseColor;
    size?: ListItemSize;
    value?: V;
  };

const ListItem: NamedExoticComponent<ListItemProps> = memo(
  ({
    onClick,
    title,
    subtitle,
    icon,
    selected,
    endElement,
    iconColor,
    size = ListItemSize.LARGE,
    sx,
    ...props
  }) => {
    return (
      <MuiListItem
        disablePadding
        disableGutters
        sx={{
          width: "100%",
          height: size === "small" ? "32px" : "50px",
          ".MuiListItemSecondaryAction-root": {
            display: "flex",
            alignItems: "center",
          },
          ...sx,
        }}
        {...props}
      >
        <MuiListItemButton
          disableGutters
          selected={selected}
          onClick={onClick}
          sx={{
            height: "100%",
            borderRadius: 2,
            padding: "16px !important",
            paddingRight: endElement ? "8px !important" : "16px !important",
            color: ({ palette: { mode, primary } }) => {
              return selected ? (mode === "dark" ? primary.light : primary.main) : "inherit";
            },
          }}
        >
          {/* Icon */}
          {icon && (
            <MuiListItemIcon
              sx={{
                minWidth: 24,
                width: 24,
                display: "flex",
                justifyContent: "center",
                color: "inherit",
                mr: 2,
              }}
            >
              <Icon
                icon={icon}
                width={24}
                color={iconColor || selected ? BaseColor.PRIMARY : BaseColor.INHERIT}
              />
            </MuiListItemIcon>
          )}
          {/* Text */}
          <MuiListItemText
            primary={title}
            secondary={subtitle}
            primaryTypographyProps={{ variant: "subtitle2", noWrap: true, fontWeight: "bold" }}
            secondaryTypographyProps={{ variant: "caption", noWrap: true, mt: -0.5 }}
            sx={{ m: 0, px: 0 }}
          />
          {/* End Element */}
          {endElement}
        </MuiListItemButton>
      </MuiListItem>
    );
  },
);

export default ListItem;
