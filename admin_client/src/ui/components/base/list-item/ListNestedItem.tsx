import type { NamedExoticComponent, ReactNode } from "react";
import { memo, useCallback, useMemo, useState } from "react";

import MuiCollapse from "@mui/material/Collapse";

import IconOfListitemNestedArrow from "~/ui/assets/images/icons/listitem-nested-arrow.png";
import { ListWrapper, type ListWrapperProps } from "~/ui/components/base/list";
import { Icon } from "~/ui/components/customs/icons";
import { Popover, usePopover } from "../popover";
import ListItem, { type ListItemProps } from "./ListItem";

export type ListCollapsableItemProps = ListItemProps & {
  nestList: ListWrapperProps["list"];
  nestListSx?: ListWrapperProps["sx"];
  isOmittedWithPopover?: boolean;
};

const ListNestedItem: NamedExoticComponent<ListCollapsableItemProps> = memo(
  ({ nestList, nestListSx, isOmittedWithPopover = false, sx, ...props }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const toggleExpanded = useCallback(() => setIsExpanded((s) => !s), []);

    const CollapsableListWrapper = useMemo<ReactNode>(() => {
      return (
        <MuiCollapse in={isExpanded} orientation="vertical" timeout="auto" unmountOnExit>
          <ListWrapper
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
          anchorOrigin={{ vertical: "center", horizontal: "right" }}
          transformOrigin={{ vertical: "center", horizontal: "left" }}
        >
          <ListWrapper component="div" list={nestList} listItemSx={{ my: 0, ...nestListSx }} />
        </Popover>
      );
    }, [popover.isOpen, popover.anchorEl, popover.handleClose, nestList, nestListSx]);

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
