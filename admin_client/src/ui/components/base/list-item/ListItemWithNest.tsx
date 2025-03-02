import type { NamedExoticComponent } from "react";
import { memo } from "react";

import {
  CollapsableWrapper,
  CollapsableWrapperExpandIcon,
  type CollapsableWrapperProps,
} from "../collapsable-wrapper";
import { Menu, type MenuProps } from "../menu";
import type { ListItemProps } from "./ListItem";
import ListItem from "./ListItem";

export type ListItemWithNestProps = Omit<ListItemProps, "sx" | "endElement"> & {
  defaultExpanded?: CollapsableWrapperProps["defaultExpanded"];
  triggerSx?: ListItemProps["sx"];
  nestList?: MenuProps["list"];
  nestListSx?: MenuProps["sx"];
  renderListItem?: MenuProps["renderListItem"];
};

const ListItemWithNest: NamedExoticComponent<ListItemWithNestProps> = memo(
  ({ defaultExpanded, onClick, triggerSx, nestList, nestListSx, renderListItem, ...props }) => {
    return (
      <CollapsableWrapper
        defaultExpanded={defaultExpanded}
        hideDefaultExpandIcon
        triggerSx={triggerSx}
        renderCollapsedTrigger={({ isExpanded, toggleExpanded }) => (
          <ListItem
            endElement={
              <CollapsableWrapperExpandIcon
                isExpanded={isExpanded}
                sx={{ ml: 1, color: "inherit" }}
              />
            }
            onClick={(e) => {
              toggleExpanded();
              onClick?.(e);
            }}
            {...props}
          />
        )}
        renderCollapsedContent={() => (
          <Menu list={nestList} renderListItem={renderListItem} sx={{ ...nestListSx }} />
        )}
      />
    );
  },
);

export default ListItemWithNest;
