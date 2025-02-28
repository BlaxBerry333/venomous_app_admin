import type { NamedExoticComponent, ReactNode } from "react";
import { memo, useCallback, useMemo, useState } from "react";

import MuiCollapse from "@mui/material/Collapse";

import { BasePosition } from "~/ui/_helpers";
import IconOfListitemNestedArrow from "~/ui/assets/images/icons/listitem-nested-arrow.png";
import { Menu, type MenuProps } from "~/ui/components/base/menu";
import { Popover, usePopover } from "~/ui/components/base/popover";
import { Icon } from "~/ui/components/customs/icons";
import ListItem, { type ListItemProps } from "./ListItem";

export type ListCollapsableItemProps = ListItemProps & {
  nestList: MenuProps["list"];
  nestListSx?: MenuProps["sx"];
  isOmittedWithPopover?: boolean;
  popoverPosition?: BasePosition;
};

const ListNestedItem: NamedExoticComponent<ListCollapsableItemProps> = memo(
  ({
    nestList,
    nestListSx,
    isOmittedWithPopover = false,
    sx,
    popoverPosition = BasePosition.RIGHT_CENTER,
    ...props
  }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const toggleExpanded = useCallback(() => setIsExpanded((s) => !s), []);

    const CollapsableListWrapper = useMemo<ReactNode>(() => {
      return (
        <MuiCollapse in={isExpanded} orientation="vertical" timeout="auto" unmountOnExit>
          <Menu
            component="div"
            list={nestList}
            sx={{
              display: isOmittedWithPopover ? "none" : "block",
              overflow: "hidden",
              pl: 5.5,
              ...nestListSx,
            }}
            renderItem={(item) => (
              <ListItem
                key={item.title}
                sx={{
                  "&::before": {
                    content: "''",
                    position: "absolute",
                    top: "-36px",
                    left: "-17px",
                    height: "100%",
                    width: "2px",
                    bgcolor: ({ palette: { mode } }) => (mode === "dark" ? "grey.800" : "grey.300"),
                  },
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    left: "-17px",
                    top: "12px",
                    height: "16px",
                    width: "16px",
                    bgcolor: ({ palette: { mode } }) => (mode === "dark" ? "grey.800" : "grey.300"),
                    mask: `url(${IconOfListitemNestedArrow}) no-repeat 50% 50% / 100%`,
                    WebkitMask: `url(${IconOfListitemNestedArrow}) no-repeat 50% 50% / 100%`,
                  },
                }}
                {...item}
              />
            )}
          />
        </MuiCollapse>
      );
    }, [isExpanded, nestList, nestListSx, isOmittedWithPopover]);

    // ----------------------------------------------------------------------------------------------------

    const popover = usePopover();
    const PopoverListWrapper = useMemo<ReactNode>(() => {
      return (
        <Popover
          isOpen={popover.isOpen}
          anchorEl={popover.anchorEl}
          handleClose={popover.handleClose}
          position={popoverPosition}
        >
          <Menu component="div" list={nestList} listItemSx={{ my: 0, ...nestListSx }} />
        </Popover>
      );
    }, [
      popover.isOpen,
      popover.anchorEl,
      popover.handleClose,
      nestList,
      nestListSx,
      popoverPosition,
    ]);

    // ----------------------------------------------------------------------------------------------------

    return (
      <>
        <ListItem
          onClick={!isOmittedWithPopover ? toggleExpanded : popover.handleOpen}
          endElement={
            <Icon
              icon={
                isExpanded
                  ? "solar:alt-arrow-right-bold-duotone"
                  : "solar:alt-arrow-down-bold-duotone"
              }
              sx={{ cursor: "pointer", display: !isOmittedWithPopover ? "flex" : "none" }}
              onClick={toggleExpanded}
            />
          }
          sx={{
            mb: 0,
            borderRadius: 2,
            bgcolor: isExpanded ? "action.hover" : "transparent",
            width: isOmittedWithPopover ? "60px" : "auto",
            ...sx,
          }}
          {...props}
        />

        {!isOmittedWithPopover && CollapsableListWrapper}

        {isOmittedWithPopover && PopoverListWrapper}
      </>
    );
  },
);

export default ListNestedItem;
