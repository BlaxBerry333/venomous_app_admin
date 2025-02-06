import type { MouseEventHandler, NamedExoticComponent, PropsWithChildren, ReactNode } from "react";
import { memo } from "react";

import { Icon } from "@iconify/react";

import MuiBox from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import MuiListItemText from "@mui/material/ListItemText";
import MuiPaper, { type PaperProps as MuiPaperProps } from "@mui/material/Paper";

import { CustomNormalListItem } from "~/common/components/custom/list";
import { CustomPulldownMenuList } from "~/common/components/custom/pulldown";

const CardWithPulldownMenuList: NamedExoticComponent<
  PropsWithChildren<{
    onlyWrapper?: boolean;
    showActionMenu?: boolean;
    primaryTitle?: ReactNode;
    secondaryTitle?: ReactNode;
    actionMenuListWidth?: number;
    actionMenuList?: Array<{
      icon?: ReactNode;
      label: ReactNode;
      onClick: VoidFunction;
      isErrorAction?: boolean;
    }>;
    sx?: MuiPaperProps["sx"];
    onClick?: MouseEventHandler<HTMLDivElement>;
  }>
> = memo(
  ({
    children,
    onlyWrapper = false,
    showActionMenu = true,
    primaryTitle,
    secondaryTitle,
    actionMenuListWidth = 200,
    actionMenuList,
    sx,
    onClick,
  }) => {
    return (
      <MuiPaper
        elevation={2}
        sx={{
          maxWidth: "auto",
          height: 160,
          p: 2,
          borderRadius: 2,
          cursor: "pointer",
          position: "relative",
          transition: "all 0.5s",
          ...sx,
        }}
        onClick={onClick}
      >
        {onlyWrapper && children}

        {!onlyWrapper && (
          <MuiListItemText
            sx={{ width: 1 }}
            primaryTypographyProps={{
              noWrap: true,
              typography: "subtitle1",
              width: 0.8,
            }}
            secondaryTypographyProps={{
              component: "div",
              typography: "caption",
              mt: 1,
            }}
            primary={primaryTitle}
            secondary={secondaryTitle}
          />
        )}

        {!onlyWrapper && showActionMenu && (
          <MuiBox sx={{ position: "absolute", top: 8, right: 8 }}>
            <CustomPulldownMenuList
              renderMainItem={({ isOpen, toggle }) => (
                <MuiIconButton
                  disabled={isOpen}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle();
                  }}
                >
                  <Icon icon="solar:menu-dots-bold" />
                </MuiIconButton>
              )}
              menuListWrapperPaperSx={{
                width: actionMenuListWidth,
                height: "auto !important",
                padding: "0px !important",
                marginTop: "0px !important",
              }}
              menuListProps={{
                onClick: (e) => e.stopPropagation(),
              }}
            >
              {actionMenuList?.map(({ icon, label, onClick, isErrorAction }, index) => (
                <CustomNormalListItem
                  key={index}
                  icon={icon}
                  MuiListItemTextProps={{ primary: label }}
                  MuiListItemButtonProps={{
                    onClick,
                    sx: { px: 1, mb: 0, color: isErrorAction ? "error.main" : "inherit" },
                  }}
                />
              ))}
            </CustomPulldownMenuList>
          </MuiBox>
        )}
      </MuiPaper>
    );
  },
);

export default CardWithPulldownMenuList;
