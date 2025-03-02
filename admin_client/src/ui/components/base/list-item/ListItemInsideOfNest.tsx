import { memo, type NamedExoticComponent } from "react";

import IconOfListitemNestedArrow from "~/ui/assets/images/icons/listitem-nested-arrow.png";
import ListItem, { type ListItemProps } from "./ListItem";

type ListItemInsideOfNestProps = ListItemProps<string | number>;

const ListItemInsideOfNest: NamedExoticComponent<ListItemInsideOfNestProps> = memo(
  ({ sx, ...props }) => {
    return (
      <ListItem
        sx={{
          "&::before": {
            content: "''",
            position: "absolute",
            top: "-36px",
            left: "-17px",
            height: "100%",
            width: "2px",
            bgcolor: ({ palette: { mode } }) => (mode === "dark" ? "grey.900" : "grey.200"),
          },
          "&::after": {
            content: "''",
            position: "absolute",
            left: "-17px",
            top: "12px",
            height: "16px",
            width: "16px",
            bgcolor: ({ palette: { mode } }) => (mode === "dark" ? "grey.900" : "grey.200"),
            mask: `url(${IconOfListitemNestedArrow}) no-repeat 50% 50% / 100%`,
            WebkitMask: `url(${IconOfListitemNestedArrow}) no-repeat 50% 50% / 100%`,
          },
          ...sx,
        }}
        {...props}
      />
    );
  },
);

export default ListItemInsideOfNest;
