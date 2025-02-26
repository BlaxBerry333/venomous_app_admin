import type { NamedExoticComponent } from "react";
import { memo } from "react";

import MuiCircularProgress from "@mui/material/CircularProgress";
import MuiLinearProgress from "@mui/material/LinearProgress";

import { useTheme } from "@mui/material/styles";
import Mask, { MaskCursor } from "./Mask";

export enum LoadingProgress {
  LINEAR = "linear",
  CIRCULAR = "circular",
}

/**
 * @example
 * ```tsx
 * <div style={{ position: "relative", width: 300, height: 300 }}>
 *   <MaskWithBlocked />
 * </div>
 * ```
 */
const MaskWithLoading: NamedExoticComponent<{
  isLoading?: boolean;
  progress?: LoadingProgress;
}> = memo(({ isLoading = true, progress = LoadingProgress.LINEAR }) => {
  const theme = useTheme();

  return (
    <Mask show={isLoading} cursor={MaskCursor.LOADING}>
      {/* Linear Bar */}
      {progress === LoadingProgress.LINEAR && (
        <MuiLinearProgress
          sx={{
            width: "100%",
            display: isLoading ? "block" : "none",
            position: "absolute",
            top: 0,
          }}
        />
      )}

      {/* Circular Bar */}
      {progress === LoadingProgress.CIRCULAR && (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: isLoading ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={0} height={0}>
            <defs>
              <linearGradient id="custom_circular_progress" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={theme.palette.primary.dark} />
                <stop offset="100%" stopColor={theme.palette.primary.light} />
              </linearGradient>
            </defs>
          </svg>
          <MuiCircularProgress
            disableShrink
            sx={{ "svg circle": { stroke: "url(#custom_circular_progress)" } }}
          />
        </div>
      )}
    </Mask>
  );
});

export default MaskWithLoading;
