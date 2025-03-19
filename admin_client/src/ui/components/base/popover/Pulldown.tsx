import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { BasePosition } from "~/ui/_helpers";
import Popover, { usePopover, type PopoverProps } from "./Popover";

export type PulldownProps = Omit<PopoverProps, "arrow" | "autoWidth"> & {
  renderPulldownTrigger: (params: ReturnType<typeof usePopover>) => JSX.Element;
  renderPulldownContent: (params: ReturnType<typeof usePopover>) => JSX.Element;
};

const Pulldown: NamedExoticComponent<PulldownProps> = memo(
  ({
    renderPulldownTrigger,
    renderPulldownContent,
    position = BasePosition.BOTTOM_CENTER,
    ...props
  }) => {
    const popover = usePopover();

    return (
      <>
        {/* Pulldown Trigger */}
        {renderPulldownTrigger(popover)}

        {/* Pulldown Content */}
        <Popover
          isOpen={popover.isOpen}
          anchorEl={popover.anchorEl}
          handleClose={popover.handleClose}
          position={position}
          arrow={false}
          autoWidth
          {...props}
        >
          {renderPulldownContent(popover)}
        </Popover>
      </>
    );
  },
);

export default Pulldown;
