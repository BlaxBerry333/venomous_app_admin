import React from "react";

import type { Preview } from "@storybook/react";

import { ThemePaletteColorName } from "../src/ui/_helpers";
import { ThemeMode, useThemeStore } from "../src/ui/_hooks";
import { ThemeProvider } from "../src/ui/_providers";
import { Router } from "../src/utils/libs/router";

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: "Dark", value: "#121212" },
        { name: "Light", value: "#FFFFFF" },
      ],
    },
  },
  globalTypes: {
    paletteColorName: {
      description: "自定义全局主题色",
      toolbar: {
        title: "主题色",
        icon: "circlehollow",
        items: Object.values(ThemePaletteColorName).map((name) => ({
          value: name,
          title: name,
          icon: "circle",
        })),
      },
    },
    language: {
      description: "自定义全局语言",
      toolbar: {
        icon: "globe",
        dynamicTitle: true,
        items: [
          { value: "en", right: "🇺🇸", title: "English" },
          { value: "fr", right: "🇫🇷", title: "Français" },
          { value: "es", right: "🇪🇸", title: "Español" },
          { value: "zh", right: "🇨🇳", title: "中文" },
          { value: "kr", right: "🇰🇷", title: "한국어" },
        ],
      },
    },
  },
  initialGlobals: {
    backgrounds: {
      value: useThemeStore.getState().mode === ThemeMode.DARK ? "#121212" : "#FFFFFF",
    },
    paletteColorName: useThemeStore.getState().paletteColorName,
    language: "en",
  },
  decorators: [
    (Story, context) => {
      const isDarkMode = context.globals?.backgrounds?.value === "#121212";
      const mode = isDarkMode ? ThemeMode.DARK : ThemeMode.LIGHT;
      const paletteColorName = context.globals?.paletteColorName as ThemePaletteColorName;

      const { setMode, setPaletteColorName } = useThemeStore();

      React.useEffect(() => {
        setMode(mode);
        setPaletteColorName(paletteColorName);
      }, [mode, paletteColorName, setMode, setPaletteColorName]);

      return (
        <React.Fragment>
          <ThemeProvider>
            <Router>
              <Story />
            </Router>
          </ThemeProvider>
        </React.Fragment>
      );
    },
  ],
};

export default preview;
