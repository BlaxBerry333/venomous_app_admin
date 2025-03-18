import type { NamedExoticComponent } from "react";
import { memo } from "react";

import { BaseColor } from "~/ui/_helpers";
import { Typography } from "~/ui/components/base/typography";
import { Icon } from "~/ui/components/customs";
import Mask, { MaskCursor, type MaskProps } from "./Mask";

type MaskWithBlockedProps = Omit<MaskProps, "cursor"> & {
  message?: string;
};

/**
 * @example
 * ```tsx
 * <div style={{ position: "relative", width: 300, height: 300 }}>
 *   <MaskWithBlocked />
 * </div>
 * ```
 */
const MaskWithBlocked: NamedExoticComponent<MaskWithBlockedProps> = memo(
  ({ show = true, message = "Access Denied", sx }) => {
    return (
      <Mask show={show} cursor={MaskCursor.NOT_ALLOWED} sx={sx}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            icon="solar:lock-keyhole-minimalistic-bold-duotone"
            color={BaseColor.ERROR}
            width={30}
          />
          <Typography
            variant="subtitle2"
            color={BaseColor.ERROR}
            noWrap
            sx={{ fontWeight: "bold", width: "90%", textAlign: "center" }}
          >
            {message}
          </Typography>
        </div>
      </Mask>
    );
  },
);

export default MaskWithBlocked;
