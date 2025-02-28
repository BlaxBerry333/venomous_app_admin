import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useMemo } from "react";

import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardContent, {
  type CardContentProps as MuiCardContentProps,
} from "@mui/material/CardContent";
import MuiCardHeader from "@mui/material/CardHeader";

import { BasePosition } from "~/ui/_helpers";
import { ListItemSize } from "~/ui/components/base/list-item";
import { MaskWithBlocked, MaskWithLoading } from "~/ui/components/base/mask";
import {
  MenuInsideActionPopover,
  type MenuInsideActionPopoverProps,
} from "~/ui/components/base/menu";
import { Typography } from "~/ui/components/base/typography";

type CardWithActionsProps = PropsWithChildren<
  Omit<MuiCardProps, "sx"> &
    Pick<MenuInsideActionPopoverProps, "actionItemList" | "actionIsNotAllowed"> & {
      isLoading?: boolean;
      isBlocked?: boolean;
      isCustomCardContent?: boolean;
      title?: string;
      subTitle?: string;
      wrapperSx?: MuiCardProps["sx"];
      sx?: MuiCardContentProps["sx"];
    }
>;

const CardWithActions: NamedExoticComponent<CardWithActionsProps> = memo(
  ({
    isLoading = false,
    isBlocked = false,
    isCustomCardContent = false,
    children,
    title,
    subTitle,
    actionItemList = [],
    actionIsNotAllowed = false,
    wrapperSx,
    sx,
    ...props
  }) => {
    const headerWithPopover = useMemo<JSX.Element | null>(() => {
      if (isCustomCardContent) return null;
      return (
        <>
          {/* Card Header */}
          <MuiCardHeader
            title={
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
            }
            subheader={
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                {subTitle}
              </Typography>
            }
            avatar={null}
            action={
              // Card Actions List Popover
              <MenuInsideActionPopover
                actionItemList={actionItemList}
                actionIsNotAllowed={actionIsNotAllowed}
                popoverPosition={BasePosition.BOTTOM_LEFT}
                listItemSize={ListItemSize.SMALL}
              />
            }
          />
        </>
      );
    }, [isCustomCardContent, title, subTitle, actionItemList, actionIsNotAllowed]);

    return (
      <MuiCard elevation={3} sx={{ position: "relative", ...wrapperSx }} {...props}>
        {/* NotAllowed Mask */}
        <MaskWithBlocked show={isBlocked} />

        {/* Loading Mask */}
        <MaskWithLoading isLoading={isLoading} />

        {/* Default Content */}
        {!isCustomCardContent && (
          <>
            {/* Card Default Header */}
            {headerWithPopover}

            {/* Card Default Content */}
            <MuiCardContent sx={{ typography: "body2", color: "text.secondary", ...sx }}>
              {children}
            </MuiCardContent>
          </>
        )}

        {/* Custom Content */}
        {isCustomCardContent && (
          <MuiCardContent sx={{ p: 4, typography: "body2", ...sx }}>{children}</MuiCardContent>
        )}
      </MuiCard>
    );
  },
);

export default CardWithActions;
