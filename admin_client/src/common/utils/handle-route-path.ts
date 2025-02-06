import { escapeRegExp, replace } from "lodash-es";

/**
 * 替换路由地址中的某个片段，返回替换后的路由地址。
 * @param path 完整的路由地址
 * @param segment 要替换的路由地址中的片段
 * @param value 要替换为的某个值
 * @example
 * ```ts
 * replaceRoutePathSegment("/foo/:bar", ":bar", 12345); // /foo/12345
 * replaceRoutePathSegment("/foo/:bar", ":bar", "xxx"); // /foo/xxx
 * ```
 */
export function replaceRoutePathSegment(
  path: string,
  segment: string,
  value: string | number,
): string {
  const escapedSegment = escapeRegExp(segment); // 转义特殊字符
  const regex = new RegExp(escapedSegment, "g");
  return replace(path, regex, String(value));
}

/**
 * 剔除路由地址中的根路径，返回剩余的路由地址。
 * @param path 完整的路由地址
 * @param rootSegment 根路径的片段
 * @example
 * ```ts
 * sliceRoutePathRootSegment("/foo/bar/baz", "/foo"); // bar/baz
 * ```
 */
export function sliceRoutePathRootSegment(path: string, rootSegment: string): string {
  if (path.startsWith(rootSegment)) {
    return path.slice(`${rootSegment}/`.length);
  }
  return path;
}

/**
 * 向路由地址中添加查询参数，返回携带查询参数的路由地址。
 * @param path 完整的路由地址
 * @param queryParams 查询参数的键值对对象
 * @example
 * ```ts
 * const url = appendQueryParams('path', { a: 1, b: 2 }); // path?a=1&b=2
 * const url = appendQueryParams('path', { });            // path
 * ```
 */
export function appendQueryParams(path: string, queryParams: Record<string, string>): string {
  if (Object.keys(queryParams).length === 0) {
    return path;
  }
  const queryString = new URLSearchParams(queryParams).toString();
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${queryString}`;
}

/**
 * 从查询字符串中获取所有的键值对，并以一个对象形式返回
 * @param searchQuery 查询字符串
 * @example
 * ```ts
 * const searchParams = getSearchParams('?a=1&b=2'); // {a: '1', b: '2'}
 * ```
 */
export function getQueryParams(searchQuery: string): Record<string, string> {
  const searchParams = new URLSearchParams(searchQuery);
  const result: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
