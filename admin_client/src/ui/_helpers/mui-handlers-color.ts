import { alpha, darken, lighten } from "@mui/material/styles";

export enum BaseColor {
  INHERIT = "inherit",
  PRIMARY = "primary",
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

/**
 * 获取颜色
 * @example
 * ```ts
 * getColor("#00796b").lighter();
 * getColor("#00796b").darker();
 * getColor("#00796b").opacity();
 * ```
 */
export function getColor(color: string) {
  return {
    main: color,
    lighter: (value: number = 0.5) => lighten(color, value),
    darker: (value: number = 0.5) => darken(color, value),
    opacity: (value: number = 0.5) => alpha(color, value),
  };
}
