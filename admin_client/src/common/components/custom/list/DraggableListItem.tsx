import type { FC } from "react";
import { memo, startTransition, useCallback, useState } from "react";

import { CustomNormalListItem } from ".";
import type { CustomListItemProps } from "./NormalListItem";

enum CursorStyle {
  grab = "grab",
  grabbing = "grabbing",
  default = "default",
}

const CustomDraggableListItem: FC<CustomListItemProps> = ({
  MuiListItemTextProps,
  MuiListItemButtonProps,
  ...props
}) => {
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>(CursorStyle.grab);

  const handleDragStartCursorStyle = useCallback(
    () => startTransition(() => setCursorStyle(CursorStyle.grabbing)),
    [setCursorStyle],
  );

  const handleDragCursorStyle = useCallback(
    () => startTransition(() => setCursorStyle(CursorStyle.grabbing)),
    [setCursorStyle],
  );

  const handleDragEndCursorStyle = useCallback(
    () => startTransition(() => setCursorStyle(CursorStyle.grab)),
    [setCursorStyle],
  );

  return (
    <CustomNormalListItem
      MuiListItemTextProps={MuiListItemTextProps}
      MuiListItemButtonProps={{
        disableRipple: true,
        draggable: true,
        onDragStart: (event) => {
          handleDragStartCursorStyle();
          MuiListItemButtonProps?.onDragStart?.(event);
        },
        onDrag: handleDragCursorStyle,
        onDragEnd: handleDragEndCursorStyle,
        style: {
          userSelect: "none",
          cursor: cursorStyle,
        },

        ...MuiListItemButtonProps,
      }}
      {...props}
    />
  );
};

export default memo(CustomDraggableListItem);
