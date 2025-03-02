import type { ComponentType } from "react";
import { createElement, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { getNormalizePath } from "./handle-route-path";

export type AutoImportedRoutesModulesType = Record<
  string,
  () => Promise<{ default: ComponentType }>
>;

/**
 * 根据 Vite 动态导入的 glob 模块生成路由配置
 *
 * @param modules - Vite 动态导入的 glob 模块
 * @returns 路由对象数组
 *
 * @example
 * ```ts
 * const routes = autoImportedLazyRoutes(
 *   import.meta.glob("~/app/pages/**" + "/page.tsx", { eager: false })
 * );
 * ```
 */
export function autoImportedLazyRoutes(modules: AutoImportedRoutesModulesType): Array<RouteObject> {
  return Object.entries(modules).map(([filepath, importFunction]) => {
    return {
      index: false,
      path: getNormalizePath(filepath),
      element: createElement(lazy(importFunction)),
    };
  });
}
