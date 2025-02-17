import { useEffect, useMemo } from "react";

import type { Theme as MuiTheme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import { getColor, ThemePaletteColors } from "../_helpers";
import useThemeStore from "./useThemeStore";

export default function useThemesSetup() {
  const { mode, paletteColorName } = useThemeStore();

  const theme = useMemo<MuiTheme>(() => {
    const palette = ThemePaletteColors.find((p) => p.name === paletteColorName);
    const paletteColors = palette ? palette.colors : ThemePaletteColors[0].colors;

    return createTheme({
      palette: {
        mode,
        primary: paletteColors.primary,
      },
    });
  }, [mode, paletteColorName]);

  // 设置选中文本、滚动条的样式
  useEffect(() => {
    const color = getColor(theme.palette.primary.main);
    const style = document.createElement("style");
    style.innerHTML = `
      /* 设置选中文本的样式 */
      ::selection {
        background-color: ${color.opacity()};                           /* 设置选中文本的背景色 */
        color: white;                                                   /* 设置选中文本的文字颜色 */
      }

      /* 设置滚动条的样式 */
      ::-webkit-scrollbar {
        width: 8px;                                                     /* 设置滚动条的宽度 */
        height: 8px;                                                    /* 设置滚动条的高度 */
      }
      ::-webkit-scrollbar-thumb {
        background-color: ${color.main};                                /* 设置滚动条的颜色 */
        border-radius: 4px;                                             /* 设置滚动条的圆角 */
      }
      ::-webkit-scrollbar-thumb:hover {
        background-color: ${color.darker()};                            /* 悬停时加深颜色 */
      } 
      ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0.1);                         /* 滑轨颜色 */
        border-radius: 4px;                                             /* 圆角 */
        transition: opacity 0.5s ease-in-out;                           /* 滑轨过渡效果 */
      }
      /* Firefox 滚动条样式 */
      * {
        scrollbar-color: ${color.main} rgba(0, 0, 0, 0.1);            /* 滑块 和 滑轨颜色 */
        scrollbar-width: medium;                                        /* 滚动条宽度 */
      }
      /* Firefox 滚动条的过渡效果 */
      *::-webkit-scrollbar {
        transition: opacity 0.5s ease-in-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [theme.palette.primary.main]);

  return { theme };
}
