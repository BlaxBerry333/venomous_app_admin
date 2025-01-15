import dayjs from "~/common/modules/dayjs";

/**
 * 格式化日期
 */
export function formatDate(date: dayjs.ConfigType, formatString = "YYYY-MM-DD HH:mm"): string {
  return dayjs(date).format(formatString);
}
