import dayjs from "dayjs";

import "dayjs/locale/de"; // 德语
import "dayjs/locale/en"; // 英语
import "dayjs/locale/fr"; // 法语
import "dayjs/locale/it"; // 意大利语
import "dayjs/locale/ja"; // 日语
import "dayjs/locale/ko"; // 韩语
import "dayjs/locale/ru"; // 俄语
import "dayjs/locale/zh-cn"; // 中文

import type { SupportedLanguage } from "../i18next/helpers/handle-supported-languages";

/**
 * 设定 Day.js 语言
 */
export function setDayjsLocalLanguage(language: SupportedLanguage): void {
  dayjs.locale(language);
}

export default dayjs;
