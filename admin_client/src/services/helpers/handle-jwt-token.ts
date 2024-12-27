import { CommonErrorMessages } from "~/common/utils/handle-common-message";

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
      throw new Error(CommonErrorMessages.JWTTokenInvalid);
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch {
    throw new Error(CommonErrorMessages.JWTDecodeError);
  }
}

/**
 * 验证 token 是否过期
 */
export function validateTokenExpires(token: string | undefined) {
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
    throw new Error(CommonErrorMessages.JWTTokenExpired);
  }
}

/**
 * 制定 token 过期后的操作
 */
export function handleTokenExpired(exp: number, callback: () => void) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  setTimeout(() => {
    try {
      callback();
    } catch {
      throw new Error(CommonErrorMessages.JWTTokenExpired);
    }
  }, timeLeft);
}
