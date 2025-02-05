import type { NamedExoticComponent } from "react";
import { memo } from "react";

import type { MenuListProps as MuiMenuListProps } from "@mui/material/MenuList";
import MuiMenuList from "@mui/material/MenuList";

import { CustomPulldown } from ".";
import type { CustomPulldownProps } from "./Pulldown";

const CustomPulldownMenuList: NamedExoticComponent<
  CustomPulldownProps & {
    menuListProps?: MuiMenuListProps;
  }
> = memo(({ children, renderMainItem, menuListWrapperPaperSx, menuListProps, ...others }) => {
  return (
    <CustomPulldown
      mainItemWrapperSx={{ position: "relative" }}
      renderMainItem={(params) => <>{renderMainItem(params)}</>}
      menuListWrapperPaperSx={{
        width: 200,
        height: 300,
        borderRadius: 2,
        mt: 1,
        py: 1,
        px: 1,
        pb: 0,
        pr: 0,
        ...menuListWrapperPaperSx,
      }}
      {...others}
    >
      <MuiMenuList
        disablePadding
        dense
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          pr: 1,
          border: 1,
          borderColor: "divider",
          ...menuListProps?.sx,
        }}
        {...menuListProps}
      >
        {children}
      </MuiMenuList>
    </CustomPulldown>
  );
});
export default CustomPulldownMenuList;
