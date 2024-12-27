import type { AxiosError } from "axios";

/**
 * 解析 API 请求失败时的返回值，获取其中的错误信息
 */
export function getParsedAPIErrorResponse(
  error: AxiosError<{ error: { code: number; message: string } }>,
) {
  const response = error?.response;

  // 不是 axios 错误时
  if (!response) {
    return {
      code: 500,
      message: error.message,
    };
  }

  const responseError = response?.data?.error;

  // 是 axios 错误，但返回值数据结构中没有自定义的 error 属性时
  if (!responseError) {
    return {
      code: response.status,
      message: error.message,
    };
  }

  const { code, message } = responseError;
  return {
    code,
    message,
  };
}
