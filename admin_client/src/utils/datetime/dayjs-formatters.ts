import dayjs from "./dayjs-setup";

function formatInstance(
  date: string | Date,
  format?: string,
  options?: {
    timezone?: string;
    locale: string;
  },
): string {
  let instance = dayjs(date);

  if (options?.timezone) {
    instance = instance.tz(options?.timezone || dayjs.tz.guess());
  }
  if (options?.locale) {
    instance.locale(options?.locale || "en");
  }
  return instance.format(format);
}

export function formateDateTime(date: string | Date): string {
  return formatInstance(date, "YYYY-MM-DD HH:mm:ss");
}

export function formateDate(date: string | Date): string {
  return formatInstance(date, "YYYY-MM-DD");
}

export function formateTime(date: string | Date): string {
  return formatInstance(date, "HH:mm:ss");
}

export function formateFromNow(date: string | Date): string {
  return dayjs(date).fromNow();
}
