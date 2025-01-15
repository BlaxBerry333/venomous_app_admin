/**
 *  根据系统判断是否处于黑暗模式
 */
export function checkIsSystemDarkMode(): boolean {
  const mediaQueryPrefers = matchMedia("(prefers-color-scheme: dark)");
  const isDark = mediaQueryPrefers.matches;
  return isDark;
}
