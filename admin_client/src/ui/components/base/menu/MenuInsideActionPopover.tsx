import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { BaseColor, BasePosition } from "~/ui/_helpers";
import { IconButton } from "~/ui/components/base/iconbutton";
import { ListItemSize, type ListItemProps } from "~/ui/components/base/list-item";
import { Menu, type MenuProps } from "~/ui/components/base/menu";
import { Popover, usePopover, type PopoverProps } from "~/ui/components/base/popover";

export type MenuInsideActionPopoverProps = PropsWithChildren<{
  renderActionTrigger?: (params: ReturnType<typeof usePopover>) => JSX.Element;
  actionItemList?: ListItemProps[];
  actionIsNotAllowed?: boolean;
  popoverPosition?: PopoverProps["position"];
  popoverEscapeKeyDown?: PopoverProps["escapeKeyDown"];
  popoverArrow?: PopoverProps["arrow"];
  popoverAutoWidth?: PopoverProps["autoWidth"];
  listItemSize?: MenuProps["listItemSize"];
  listItemSx?: MenuProps["listItemSx"];
}>;

const MenuInsideActionPopover: NamedExoticComponent<MenuInsideActionPopoverProps> = memo(
  ({
    children,
    renderActionTrigger,
    actionItemList = [],
    actionIsNotAllowed,
    popoverPosition = BasePosition.BOTTOM_LEFT,
    popoverEscapeKeyDown = false,
    popoverArrow = true,
    popoverAutoWidth,
    listItemSize = ListItemSize.SMALL,
    listItemSx,
  }) => {
    const popover = usePopover();
    return (
      <>
        {/* Custom Action */}
        {renderActionTrigger && (
          <span style={{ display: "inline-block" }} onClick={popover.handleOpen}>
            {renderActionTrigger(popover)}
          </span>
        )}

        {/* Default Action Button */}
        {!renderActionTrigger && (
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
        )}

        {/* Action Popover With Menu */}
        <Popover
          isOpen={popover.isOpen}
          anchorEl={popover.anchorEl}
          handleClose={popover.handleClose}
          escapeKeyDown={popoverEscapeKeyDown}
          arrow={popoverArrow}
          autoWidth={popoverAutoWidth}
          position={popoverPosition}
          sx={{ display: actionIsNotAllowed ? "none" : "block" }}
        >
          {/* Custom Content */}
          {children}

          {/* Default Content */}
          {!children && actionItemList.length > 0 && (
            <Menu
              listItemSize={listItemSize}
              listItemSx={listItemSx}
              list={actionItemList?.map((item) => ({
                ...item,
                onClick: (e) => {
                  item.onClick?.(e);
                  if (!popoverEscapeKeyDown) {
                    popover.handleClose();
                  }
                },
              }))}
            />
          )}
        </Popover>
      </>
    );
  },
);

export default MenuInsideActionPopover;
