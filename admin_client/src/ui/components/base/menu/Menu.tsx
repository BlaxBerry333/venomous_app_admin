import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import MuiList, { type ListProps as MuiListProps } from "@mui/material/List";

import { ListItem, type ListItemProps } from "~/ui/components/base/list-item";

export type MenuProps = PropsWithChildren<
  MuiListProps & {
    list?: Array<ListItemProps>;
    listItemSx?: ListItemProps["sx"];
    listItemSize?: ListItemProps["size"];
    renderListItem?: (item: ListItemProps, index: number) => JSX.Element;
  }
>;

const Menu: NamedExoticComponent<MenuProps> = memo(
  ({ children, list = [], renderListItem, listItemSize, listItemSx, sx, ...props }) => {
    return (
      <MuiList
        disablePadding
        sx={{
          "& li.MuiListItem-root": { mb: 0.5 },
          "& li.MuiListItem-root:last-child": { mb: 0 },
          ...sx,
        }}
        {...props}
      >
        {/* 默认渲染列表 */}
        {list?.map((item, index) => {
          // 使用自定义渲染
          if (renderListItem) return renderListItem(item, index);
          // 使用默认渲染
          return (
            <ListItem
              key={item.title}
              sx={{ my: 0.5, ...listItemSx }}
              size={listItemSize}
              {...item}
            />
          );
        })}

        {/* 使用自定义内容 */}
        {!list?.length && children}
      </MuiList>
    );
  },
);

export default Menu;
