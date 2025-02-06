import path from "path";
import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: parseInt(ENV.VITE_ADMIN_CLIENT_PORT),
      strictPort: true,
      proxy: {
        // "/drf/api" → "http://localhost:8000"
        "/drf/api": {
          target: ENV.VITE_DOMAIN_ADMIN_SERVER,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/drf\/api/, ""),
        },
        // "/bff/api" → "http://localhost:9000
        "/bff/api": {
          target: ENV.VITE_DOMAIN_BFF,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/bff\/api/, ""),
        },
      },
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
              open: ENV.VITE_ADMIN_CLIENT_ENV_NAME === "production", // 在本地基于发环境打包后自动打开分析页面
              filename: `.build_stats/rollup_build_stats.html`,
            };
          }),
        ],

        output: {
          // 分包策略
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString(); // 第三方依赖拆包
              // return "vendor"; //  第三方依赖单独打包到 vendor-[hash].js
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
        "@mui/base",
        "@mui/lab",
        "@mui/material",
        "@mui/x-charts",
        "@mui/x-data-grid",
        "@mui/x-date-pickers",
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
