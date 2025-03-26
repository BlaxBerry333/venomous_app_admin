import type { NamedExoticComponent, PropsWithChildren, ReactNode } from "react";
import { memo, useMemo } from "react";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";
import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardContent, {
  type CardContentProps as MuiCardContentProps,
} from "@mui/material/CardContent";

import { BasePosition } from "~/ui/_helpers";
import { MaskWithBlocked, MaskWithLoading } from "~/ui/components/base/mask";
import {
  MenuInsideActionPopover,
  type MenuInsideActionPopoverProps,
} from "~/ui/components/base/menu";
import { Typography } from "~/ui/components/base/typography";

export type CardWithActionsProps = PropsWithChildren<
  Omit<MuiCardProps, "sx"> &
    Pick<
      MenuInsideActionPopoverProps,
      "actionItemList" | "actionIsNotAllowed" | "popoverPosition"
    > & {
      isLoading?: boolean;
      isBlocked?: boolean;
      isCustomCardContent?: boolean;
      isCustomCardAction?: boolean;
      title?: string;
      subTitle?: string;
      avatar?: ReactNode;
      action?: ReactNode;
      wrapperSx?: MuiCardProps["sx"];
      headerSx?: MuiBoxProps["sx"];
      contentSx?: MuiCardContentProps["sx"];
    }
>;

const CardWithActions: NamedExoticComponent<CardWithActionsProps> = memo(
  ({
    isLoading = false,
    isBlocked = false,
    isCustomCardContent = false,
    isCustomCardAction = false,
    children,
    title,
    subTitle,
    avatar,
    action,
    actionItemList = [],
    actionIsNotAllowed = false,
    popoverPosition = BasePosition.BOTTOM_LEFT,
    wrapperSx,
    headerSx,
    contentSx,
    ...props
  }) => {
    const headerTitles = useMemo<JSX.Element>(() => {
      return (
        <Typography component="div" noWrap sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Card Header Icon */}
          {avatar}

          {/* Card Header Titles */}
          <Typography component="div" noWrap>
            {title && (
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: "bold",
                  transform: `translateY(${subTitle ? "4px" : "0px"})`,
                }}
              >
                {title}
              </Typography>
            )}
            {subTitle && (
              <Typography
                variant="subtitle2"
                noWrap
                sx={{
                  color: "text.disabled",
                  fontWeight: "bold",
                  transform: `translateY(${title ? "-4px" : "0px"})`,
                }}
              >
                {subTitle}
              </Typography>
            )}
          </Typography>
        </Typography>
      );
    }, [avatar, title, subTitle]);

    const header = useMemo<JSX.Element | null>(() => {
      if (isCustomCardContent) return null;
      return (
        <MuiBox
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            ...headerSx,
          }}
        >
          {/* Card Header */}
          {headerTitles}

          {/* Card Actions */}
          {isCustomCardAction && action}

          {/* Card Actions List Popover */}
          {!isCustomCardAction && (
            <MuiBox sx={{ display: "flex", alignItems: "center" }}>
              {action}
              <MenuInsideActionPopover
                actionItemList={actionItemList}
                actionIsNotAllowed={actionIsNotAllowed}
                popoverPosition={popoverPosition}
              />
            </MuiBox>
          )}
        </MuiBox>
      );
    }, [
      isCustomCardContent,
      isCustomCardAction,
      headerTitles,
      headerSx,
      action,
      actionItemList,
      actionIsNotAllowed,
      popoverPosition,
    ]);

    return (
      <MuiCard
        elevation={3}
        sx={{
          position: "relative",
          borderRadius: "8px",
          p: 1,
          transition: "background-color 0s, background-image 0s",
          ...wrapperSx,
        }}
        {...props}
      >
        {/* NotAllowed Mask */}
        <MaskWithBlocked show={isBlocked} sx={{ borderRadius: "8px" }} />

        {/* Loading Mask */}
        <MaskWithLoading isLoading={isLoading} />

        {/* Default Content */}
        {!isCustomCardContent && (
          <>
            {/* Card Default Header */}
            {header}

            {/* Card Default Content */}
            <Typography
              component={MuiCardContent}
              variant="body2"
              noWrap
              sx={{ color: "text.secondary", overflow: "visible", ...contentSx }}
            >
              {children}
            </Typography>
          </>
        )}

        {/* Custom Content */}
        {isCustomCardContent && (
          <Typography
            component={MuiCardContent}
            variant="body2"
            noWrap
            sx={{ color: "text.secondary", overflow: "visible", p: 2, ...contentSx }}
          >
            {children}
          </Typography>
        )}
      </MuiCard>
    );
  },
);

export default CardWithActions;
