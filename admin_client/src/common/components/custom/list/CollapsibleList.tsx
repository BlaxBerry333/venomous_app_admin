import type { FC, PropsWithChildren } from "react";
import { memo, useMemo } from "react";

import { Icon } from "@iconify/react";

import MuiCollapse from "@mui/material/Collapse";
import MuiList, { type ListProps as MuiListProps } from "@mui/material/List";
import MuiListSubheader from "@mui/material/ListSubheader";
import MuiTypography from "@mui/material/Typography";

import useBoolean from "~/common/hooks/useBoolean";

type Props = PropsWithChildren<{
  MuiListProps?: MuiListProps;
  expandedTitle: string;
  defaultIsExpanded?: boolean;
  alwaysShowExpandedIcon?: boolean;
}>;

const CustomCollapsibleList: FC<Props> = ({
  children,
  MuiListProps,
  expandedTitle,
  defaultIsExpanded = true,
  alwaysShowExpandedIcon = true,
}) => {
  const expandHandler = useBoolean(defaultIsExpanded);

  const showExpandedIcon = useMemo<boolean>(
    () => expandHandler.value || alwaysShowExpandedIcon,
    [expandHandler.value, alwaysShowExpandedIcon],
  );

  return (
    <MuiList
      disablePadding
      sx={{ width: "100%", mb: 1 }}
      subheader={
        <MuiListSubheader
          onClick={expandHandler.toggle}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            py: 1,
            px: 0,
          }}
        >
          <Icon
            icon={
              expandHandler.value
                ? "solar:alt-arrow-down-bold-duotone"
                : "solar:alt-arrow-right-bold-duotone"
            }
            style={{
              transform: `scale(${showExpandedIcon ? 1 : 0})`,
              animation: "transform 0.5s",
            }}
          />
          <MuiTypography variant="subtitle2" color="textDisabled" sx={{ ml: 0.5 }}>
            {expandedTitle}
          </MuiTypography>
        </MuiListSubheader>
      }
      {...MuiListProps}
    >
      <MuiCollapse in={expandHandler.value} timeout="auto" unmountOnExit>
        {children}
      </MuiCollapse>
    </MuiList>
  );
};

export default memo(CustomCollapsibleList);
