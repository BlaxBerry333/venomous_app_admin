import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo, useMemo } from "react";

import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardContent, {
  type CardContentProps as MuiCardContentProps,
} from "@mui/material/CardContent";
import MuiCardHeader from "@mui/material/CardHeader";

import { BaseColor, BasePosition } from "~/ui/_helpers";
import {
  IconButton,
  ListItemSize,
  ListWrapper,
  MaskWithBlocked,
  MaskWithLoading,
  Popover,
  Typography,
  usePopover,
  type ListItemProps,
} from "~/ui/components/base";

type CardWithActionsProps = PropsWithChildren<
  Omit<MuiCardProps, "sx"> & {
    isLoading?: boolean;
    isBlocked?: boolean;
    isCustomCardContent?: boolean;
    title?: string;
    subTitle?: string;
    actionItemList?: ListItemProps[];
    actionIsNotAllowed?: boolean;
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
    const popover = usePopover();
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
              <IconButton
                disabled={actionIsNotAllowed}
                icon={
                  actionIsNotAllowed
                    ? "solar:lock-keyhole-minimalistic-bold-duotone"
                    : "solar:menu-dots-line-duotone"
                }
                color={actionIsNotAllowed ? BaseColor.ERROR : BaseColor.INHERIT}
                onClick={popover.handleOpen}
              />
            }
          />
          {/* Card Actions List Popover */}
          <Popover
            isOpen={popover.isOpen}
            anchorEl={popover.anchorEl}
            handleClose={popover.handleClose}
            position={BasePosition.BOTTOM_CENTER}
            sx={{ display: actionIsNotAllowed ? "none" : "block" }}
          >
            <ListWrapper
              listItemSize={ListItemSize.SMALL}
              list={actionItemList.map((item) => ({
                ...item,
                onClick: (e) => {
                  item.onClick?.(e);
                  popover.handleClose();
                },
              }))}
            />
          </Popover>
        </>
      );
    }, [isCustomCardContent, title, subTitle, actionItemList, actionIsNotAllowed, popover]);

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
