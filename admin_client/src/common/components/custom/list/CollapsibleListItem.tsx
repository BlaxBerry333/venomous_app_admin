import type { FC, PropsWithChildren } from "react";
import { memo, useMemo } from "react";

import { Icon } from "@iconify/react";

import MuiCollapse from "@mui/material/Collapse";
import MuiList, { type ListProps as MuiListProps } from "@mui/material/List";

import useBoolean from "~/common/hooks/useBoolean";
import CustomNormalListItem, { type CustomListItemProps } from "./NormalListItem";

type Props = PropsWithChildren<
  CustomListItemProps & {
    defaultIsExpanded?: boolean;
    showLinesBeforeItem?: boolean;
    ItemListProps?: MuiListProps;
  }
>;

const CollapsibleListItem: FC<Props> = ({
  children,
  MuiListItemButtonProps,
  MuiListItemTextProps,
  defaultIsExpanded = true,
  showLinesBeforeItem = true,
  icon,
  ItemListProps,
}) => {
  const { value: isExpanded, toggle } = useBoolean(defaultIsExpanded);

  const defaultStyles = useMemo<MuiListProps["sx"]>(() => {
    if (!showLinesBeforeItem) {
      return {
        pl: 5,
        "& li": {
          position: "relative",
          mb: 0,
        },
        ...ItemListProps?.sx,
      };
    }
    return {
      pl: 5,
      "&::before": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 24,
        height: "calc(100% - 32px)",
        width: "2px",
        backgroundColor: ({ palette }) => palette.grey[200],
      },
      "& li": {
        position: "relative",
        mb: 0,
      },
      "& li::before": {
        content: "''",
        position: "absolute",
        top: -8,
        left: "-16px",
        height: "100%",
        width: "16px",
        backgroundColor: ({ palette }) => palette.grey[200],
        mask: "url('/icons/arrow-collapse-subitem.svg') 50% 50% / 100% no-repeat",
      },
      ...ItemListProps?.sx,
    };
  }, [showLinesBeforeItem, ItemListProps?.sx]);

  return (
    <>
      <CustomNormalListItem
        icon={icon}
        end={
          <Icon
            icon={
              isExpanded
                ? "solar:alt-arrow-down-bold-duotone"
                : "solar:alt-arrow-right-bold-duotone"
            }
          />
        }
        MuiListItemButtonProps={{
          onClick: toggle,
          ...MuiListItemButtonProps,
        }}
        MuiListItemTextProps={MuiListItemTextProps}
      />

      <MuiCollapse in={isExpanded} timeout="auto" unmountOnExit>
        <MuiList component="ul" disablePadding {...ItemListProps} sx={defaultStyles}>
          {children}
        </MuiList>
      </MuiCollapse>
    </>
  );
};

export default memo(CollapsibleListItem);
