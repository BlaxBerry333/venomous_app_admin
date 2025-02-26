import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiList, { type ListProps as MuiListProps } from "@mui/material/List";

import { ListItem, type ListItemProps } from "~/ui/components/base/list-item";

export type ListWrapperProps = PropsWithChildren<
  MuiListProps & {
    list: Array<ListItemProps>;
    listItemSx?: ListItemProps["sx"];
    listItemSize?: ListItemProps["size"];
    renderItem?: (item: ListItemProps, index: number) => JSX.Element;
  }
>;

const ListWrapper: NamedExoticComponent<ListWrapperProps> = memo(
  ({ children, list, renderItem, listItemSize, listItemSx, sx, ...props }) => {
    return (
      <MuiList disablePadding sx={{ ...sx }} {...props}>
        {/* 使用默认样式 */}
        {list.map((item, index) =>
          renderItem ? (
            renderItem(item, index)
          ) : (
            <ListItem key={item.title} sx={{ ...listItemSx }} size={listItemSize} {...item} />
          ),
        )}

        {/* 使用自定义样式 */}
        {!list?.length && children}
      </MuiList>
    );
  },
);

export default ListWrapper;
