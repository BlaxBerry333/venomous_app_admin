import type { NamedExoticComponent, PropsWithChildren, ReactNode } from "react";
import { memo } from "react";

import MuiListItem, { type ListItemProps as MuiListItemProps } from "@mui/material/ListItem";
import MuiListItemButton, {
  type ListItemButtonProps as MuiListItemButtonProps,
} from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";

import { Icon, type IconProps } from "~/ui/components/customs/icons";

export type ListItemProps = PropsWithChildren<
  Omit<MuiListItemProps, "onClick"> &
    MuiListItemButtonProps & {
      title: string;
      subtitle?: string;
      icon?: IconProps["icon"];
      selected?: boolean;
      onClick?: MuiListItemButtonProps["onClick"];
      endElement?: ReactNode;
    }
>;

const ListItem: NamedExoticComponent<ListItemProps> = memo(
  ({ onClick, title, subtitle, icon, selected, endElement, sx, ...props }) => {
    return (
      <MuiListItem
        disablePadding
        disableGutters
        secondaryAction={endElement}
        sx={{
          my: 0.5,
          height: "50px",
          ".MuiListItemSecondaryAction-root": {
            display: "flex",
            alignItems: "center",
            paddingRight: endElement ? "16px !important" : "0 !important",
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
            color: ({ palette: { primary } }) => {
              return selected ? primary.main : "inherit";
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
                mr: 1.5,
              }}
            >
              <Icon icon={icon} width={24} sx={{ color: "inherit" }} />
            </MuiListItemIcon>
          )}
          {/* Text */}
          <MuiListItemText
            primary={title}
            secondary={subtitle}
            primaryTypographyProps={{ variant: "subtitle2", noWrap: true, fontWeight: "bold" }}
            secondaryTypographyProps={{ variant: "caption", noWrap: true, mt: -1 }}
            sx={{ m: 0, px: 0 }}
          />
        </MuiListItemButton>
      </MuiListItem>
    );
  },
);

export default ListItem;
