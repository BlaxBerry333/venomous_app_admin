import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { Menu, type MenuProps } from "../menu";
import { Popper, PopperPlacement, type PopperProps } from "../popper";
import type { ListItemProps } from "./ListItem";
import ListItem from "./ListItem";

export type ListItemWithIconPopperProps = Omit<ListItemProps, "sx" | "endElement"> & {
  triggerSx?: ListItemProps["sx"];
  nestList?: MenuProps["list"];
  nestListSx?: MenuProps["sx"];
  popperContentSx?: PopperProps["popperContentSx"];
  popperPlacement?: PopperProps["placement"];
  popperAutoWidth?: PopperProps["autoWidth"];
  renderTrigger?: PopperProps["renderPopperTrigger"];
  renderNestListItem?: MenuProps["renderListItem"];
};

const ListItemWithIconPopper: NamedExoticComponent<ListItemWithIconPopperProps> = memo(
  ({
    onClick,
    triggerSx,
    nestList,
    nestListSx,
    renderTrigger,
    renderNestListItem,
    popperContentSx,
    popperPlacement = PopperPlacement.right,
    popperAutoWidth = false,
    ...props
  }) => {
    const isEmptyContent: boolean = !nestList?.length;

    return (
      <Popper
        placement={popperPlacement}
        autoWidth={popperAutoWidth}
        hidePopperContent={isEmptyContent}
        popperContentSx={popperContentSx}
        renderPopperTrigger={(params) => {
          if (renderTrigger) return renderTrigger(params);
          return (
            <ListItem
              onClick={(e) => {
                onClick?.(e);
                params.handleOpen(e);
              }}
              sx={{ ...triggerSx }}
              {...props}
            />
          );
        }}
        renderPopperContent={() => (
          <Menu list={nestList} renderListItem={renderNestListItem} sx={nestListSx} />
        )}
      />
    );
  },
);

export default ListItemWithIconPopper;
