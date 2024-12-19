export function isValidJSON(str: string): boolean {
  const isKeyValue = str.startsWith("{") && str.endsWith("}");
  const isArray = str.startsWith("[") && str.endsWith("]");
  return typeof str === "string" && (isKeyValue || isArray);
}

/**
 * 从 LocalStorage 中获取数据
 * @param key 键名
 * @param defaultValue 数据的默认值
 * @example
 * ```ts
 * const data1 = getLocalStorageItem("xxx")
 * const data2 = getLocalStorageItem("xxx", 111)
 * const data3 = getLocalStorageItem<number>("xxx")
 * const data4 = getLocalStorageItem<{xxx: number}>("xxx")
 * ```
 */
export function getLocalStorageItem<T = string>(key: string, defaultValue?: T): T | null {
  const storedValue = localStorage.getItem(key);

  if (storedValue === null) {
    return defaultValue ?? null;
  }

  try {
    if (isValidJSON(storedValue)) {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue as T;
    }
    return storedValue as T;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

/**
 * 向 LocalStorage 中存储数据，同键名的数据已存在时会被覆盖
 * @param key 键名
 * @param data 要存储的数据
 * @example
 * ```ts
 * setLocalStorageItem("xxx", "......")
 * setLocalStorageItem("xxx", 111)
 * setLocalStorageItem("xxx", {data: 111})
 * ```
 */
export function setLocalStorageItem(key: string, data: unknown): void {
  const dataToSave = typeof data === "object" ? JSON.stringify(data) : String(data);
  localStorage.setItem(key, dataToSave);
}

/**
 * 从 LocalStorage 中删除数据
 * @param key 键名
 * @example
 * ```ts
 * removeLocalStorageItem("xxx")
 * ```
 */
export function removeLocalStorageItem(key: string): void {
  localStorage.removeItem(key);
}

/**
 * 从 SessionStorage 中获取数据
 * @param key 键名
 * @param defaultValue 数据的默认值
 * @example
 * ```ts
 * const data1 = getSessionStorageItem("xxx")
 * const data2 = getSessionStorageItem("xxx", 111)
 * const data3 = getSessionStorageItem<number>("xxx")
 * const data4 = getSessionStorageItem<{xxx: number}>("xxx")
 * ```
 */
export function getSessionStorageItem<T = string>(key: string, defaultValue?: T): T | null {
  const storedValue = sessionStorage.getItem(key);

  if (storedValue === null) {
    return defaultValue ?? null;
  }

  try {
    if (isValidJSON(storedValue)) {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue as T;
    }
    return storedValue as T;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

/**
 * 向 SessionStorage 中存储数据，同键名的数据已存在时会被覆盖
 * @param key 键名
 * @param data 要存储的数据
 * @example
 * ```ts
 * setSessionStorageItem("xxx", "......")
 * setSessionStorageItem("xxx", 111)
 * setSessionStorageItem("xxx", {data: 111})
 * ```
 */
export function setSessionStorageItem(key: string, data: unknown): void {
  const dataToSave = typeof data === "object" ? JSON.stringify(data) : String(data);
  sessionStorage.setItem(key, dataToSave);
}

/**
 * 从 SessionStorage 中删除数据
 * @param key 键名
 * @example
 * ```ts
 * removeSessionStorageItem("xxx")
 * ```
 */
export function removeSessionStorageItem(key: string): void {
  sessionStorage.removeItem(key);
}
