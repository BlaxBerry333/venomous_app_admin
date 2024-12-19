import path from "path";
import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: parseInt(env.VITE_ADMIN_CLIENT_PORT),
      strictPort: true,
    },

    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },

    plugins: [react()],

    build: {
      rollupOptions: {
        plugins: [
          visualizer(() => {
            return {
              open: env.VITE_ADMIN_CLIENT_ENV_NAME === "production", // 在本地基于发环境打包后自动打开分析页面
              filename: `.build_stats/rollup_build_stats.html`,
            };
          }),
        ],

        output: {
          // 分包策略
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "vendor"; // node_modules 中使用的第三方依赖不会改变，单独打包到 vendor-[hash].js
            }
          },
          chunkFileNames: "assets/js/[name]-[hash].js", // 引入文件名的名称
          entryFileNames: "assets/js/[name]-[hash].js", // 包的入口文件名称
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
        },
      },
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "sass",
        "@emotion/react",
        "@emotion/styled",
        "@mui/material",
        "@mui/lab",
        "@mui/base",
        "@tanstack/react-query",
        "@tanstack/react-query-devtools",
        "react-hook-form",
        "@hookform/devtools",
        "@hookform/resolvers",
        "@xyflow/react",
        "@faker-js/faker",
      ],
    },
  };
});
