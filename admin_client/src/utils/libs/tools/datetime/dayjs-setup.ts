import "dayjs/locale/ar-sa"; // Arabic
import "dayjs/locale/en"; // English
import "dayjs/locale/fr"; // French
import "dayjs/locale/ja"; // Japanese
import "dayjs/locale/vi"; // Vietnamese
import "dayjs/locale/zh-cn"; // Chinese

import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(AdvancedFormat);
dayjs.extend(relativeTime);

export default dayjs;
