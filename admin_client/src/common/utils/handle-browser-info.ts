/**
 * 获取浏览器语言
 * @example
 * ```ts
 * getBrowserLocaleWithFallback(); // "zh-CN"
 * ```
 */
export function getBrowserLocaleLanguage(): string {
  const language: string = navigator.language || "en-US";

  const [lang, region] = language.split("-");

  const regionCode = region || "US";

  return `${lang}-${regionCode}`;
}
