/**
 * 解码 JWT token
 */
export function decodeJWT(token: string | undefined) {
  try {
    if (!token) {
      return null;
    }

    const parts = token.split(".");
    if (parts.length < 2) {
      throw new Error("[ERROR] Invalid JWT token");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch {
    throw new Error("[ERROR] Invalid JWT token");
  }
}

/**
 * 验证 token 是否过期
 * Django 配置 access_token 的过期时间为 15 分钟，refresh_token 的过期时间为 1 天
 */
export function validateTokenExpires(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  try {
    const decoded = decodeJWT(token);
    if (!decoded || !("exp" in decoded)) {
      return false;
    }

    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    throw new Error("[ERROR] Invalid JWT token");
  }
}
