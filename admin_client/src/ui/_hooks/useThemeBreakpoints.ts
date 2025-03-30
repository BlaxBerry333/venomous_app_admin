import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function useThemeBreakpoints() {
  const { breakpoints } = useTheme();

  const isXs: boolean = useMediaQuery(breakpoints.down("sm"));
  const isSm: boolean = useMediaQuery(breakpoints.between("sm", "md"));
  const isMd: boolean = useMediaQuery(breakpoints.between("md", "lg"));
  const isLg: boolean = useMediaQuery(breakpoints.between("lg", "xl"));
  const isXl: boolean = useMediaQuery(breakpoints.up("xl"));

  return {
    breakpoints,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
  };
}
