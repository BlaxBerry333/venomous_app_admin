import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { BasePosition } from "~/ui/_helpers";
import IconOfListitemNestedArrow from "~/ui/assets/images/icons/listitem-nested-arrow.png";
import {
  CollapsableWrapper,
  CollapsableWrapperExpandIcon,
} from "~/ui/components/base/collapsable-wrapper";
import { Menu, type MenuProps } from "~/ui/components/base/menu";
import { Popover, usePopover } from "~/ui/components/base/popover";
import ListItem, { type ListItemProps } from "./ListItem";

export type ListNestedItemProps = ListItemProps & {
  defaultExpanded?: boolean;
  nestList?: MenuProps["list"];
  nestListSx?: MenuProps["sx"];
  isOmittedWithPopover?: boolean;
  popoverPosition?: BasePosition;
};

const ListNestedItem: NamedExoticComponent<ListNestedItemProps> = memo(
  ({
    defaultExpanded = false,
    nestList = [],
    nestListSx,
    isOmittedWithPopover = false,
    sx,
    popoverPosition = BasePosition.RIGHT_CENTER,
    ...props
  }) => {
    const isEmptyNestedContent: boolean = nestList.length <= 0;
    const showExpandIcon: boolean = !isEmptyNestedContent && !isOmittedWithPopover;
    const showPopper: boolean = !isEmptyNestedContent && isOmittedWithPopover;

    // ----------------------------------------------------------------------------------------------------

    const popover = usePopover();

    // ----------------------------------------------------------------------------------------------------

    return (
      <>
        <CollapsableWrapper
          defaultExpanded={defaultExpanded}
          hideDefaultExpandIcon
          renderCollapsedTrigger={(params) => (
            <ListItem
              onClick={(e) => {
                e.stopPropagation();
                if (isOmittedWithPopover) popover.handleOpen(e);
                params.toggleExpanded();
              }}
              sx={{
                mb: 0,
                borderRadius: 2,
                width: isOmittedWithPopover ? "60px" : "100%",
                // bgcolor: isExpanded ? "action.hover" : "transparent", // 父级展开时的背景色
                ...sx,
              }}
              endElement={
                <CollapsableWrapperExpandIcon
                  isExpanded={params.isExpanded}
                  hidden={!showExpandIcon}
                />
              }
              {...props}
            />
          )}
          renderCollapsedContent={() => (
            <Menu
              component="div"
              list={nestList}
              sx={{
                display: isOmittedWithPopover ? "none" : "block",
                overflow: "hidden",
                pl: 5.5,
                ...nestListSx,
              }}
              renderListItem={(item) => (
                <ListItem
                  key={item.title}
                  sx={{
                    my: 0.5,
                    "&::before": {
                      content: "''",
                      position: "absolute",
                      top: "-36px",
                      left: "-17px",
                      height: "100%",
                      width: "2px",
                      bgcolor: ({ palette: { mode } }) =>
                        mode === "dark" ? "grey.800" : "grey.300",
                    },
                    "&::after": {
                      content: "''",
                      position: "absolute",
                      left: "-17px",
                      top: "12px",
                      height: "16px",
                      width: "16px",
                      bgcolor: ({ palette: { mode } }) =>
                        mode === "dark" ? "grey.800" : "grey.300",
                      mask: `url(${IconOfListitemNestedArrow}) no-repeat 50% 50% / 100%`,
                      WebkitMask: `url(${IconOfListitemNestedArrow}) no-repeat 50% 50% / 100%`,
                    },
                  }}
                  {...item}
                />
              )}
            />
          )}
        />

        {showPopper && (
          <Popover
            isOpen={popover.isOpen}
            anchorEl={popover.anchorEl}
            handleClose={popover.handleClose}
            position={popoverPosition}
          >
            <Menu component="div" list={nestList} listItemSx={{ my: 0, ...nestListSx }} />
          </Popover>
        )}
      </>
    );
  },
);

export default ListNestedItem;
