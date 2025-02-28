import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../src/ui/**/*.mdx"],
  staticDirs: ["../public", { from: "../src/ui/assets", to: "/assets" }],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  env: (config) => ({
    ...config, // .env 文件中的环境变量
  }),
};
export default config;
