/**
 * 同步延迟指定毫秒
 * @param ms 毫秒
 * @example
 * ```ts
 * // ...
 * await sleep(1000); // 等待 1 秒
 * // ...
 * ```
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
