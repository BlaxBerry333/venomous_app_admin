/**
 * 将文件路径转换为路由路径
 *
 * @param filepath 文件路径
 * @param options.baseDir 文件路径中的基础目录名
 * @param options.fileName 文件名
 *
 * @example
 * ```ts
 * _getNormalizePath("/app/pages/auth/login/page.tsx");      // "/auth/login"
 * _getNormalizePath("/app/pages/auth/notes/[id]/page.tsx"); // "/auth/notes/:id"
 * _getNormalizePath("/aa/bb/cc/view.tsx", { baseDir: "/aa/bb", fileName: "view" }); // "/cc"
 * ```
 */
export function getNormalizePath(
  filepath: string,
  options: { baseDir?: string; fileName?: string } = {},
): string {
  const { baseDir = "/app/pages", fileName = "page" } = options;
  return (
    filepath
      .replace(new RegExp(`^.*${baseDir}`), "") // 提取文件路径中的基础目录名
      .replace(new RegExp(`/${fileName}\\.[a-zA-Z0-9]+$`), "") // 移除文件名及其后缀名
      .replace(/\[(.*?)\]/g, ":$1") // 将文件名中的动态参数替换为路由参数 ( 比如 `[id]`→`:id` )
      .replace(/\/index$/, "") || "/" // 移除结尾中的 `/index` 并转换为根路径 `/`
  );
}

/**
 * 获取路由路径的所有节点片段
 *
 * @param routePath 路由路径
 *
 * @description
 * 建议将路由设计为三个节点的结构:
 * - 顶级路由段：顶级路由 ( 比如 `auth|dashboard` )
 * - 二级路由段：应用名称 ( 比如 `workflow|users` )
 * - 三级路由段：具体功能 ( 比如 `create|list|:id` )
 *
 * @example
 * ```ts
 * _getRouteSegments("/auth/login");          // ["auth", "login"]
 * _getRouteSegments("/dashboard/notes/:id"); // ["dashboard", "notes", ":id"]
 * ```
 */
export function getRouteSegments(routePath: string): string[] {
  const segments = routePath.split("/").filter(Boolean);
  return segments;
}

/**
 * 获取路由路径的具体功能节点片段 ( 最后一个节点 )
 *
 * @param routePath 路由路径
 * @param options.removeSearchQuery 是否移除路由路径中的查询参数
 *
 * @description
 * 建议将路由设计为三个节点的结构:
 * - 顶级路由段：顶级路由 ( 比如 `auth|dashboard` )
 * - 二级路由段：应用名称 ( 比如 `workflow|users` )
 * - 三级路由段：具体功能 ( 比如 `create|list|detail` )
 *
 * @example
 * ```ts
 * _getRouteLeaf("/auth/login");          // "login"
 * _getRouteLeaf("/dashboard/notes/:id"); // ":id"
 * _getRouteLeaf("/dashboard/notes/123"); // "123"
 * _getRouteLeaf("/xxx/yyy?query=11");    // "yyy?query=11"
 * _getRouteLeaf("/xxx/yyy?query=11", { removeSearchQuery: true }); // "yyy"
 * ```
 */
export function getRouteLeaf(
  routePath: string,
  options: { removeSearchQuery?: boolean } = {},
): string {
  if (options?.removeSearchQuery) {
    routePath = routePath.split("?")[0];
  }
  const segments = getRouteSegments(routePath);
  const leaf = segments[segments.length - 1];
  return leaf;
}
