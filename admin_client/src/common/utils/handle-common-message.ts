export enum CommonMessage {}
// ...

export enum CommonErrorMessages {
  // 通用错误
  // -------------------------------------------------
  UnknownError = "Unknown error", // 未知错误

  // 网络相关误
  // -------------------------------------------------
  NoInternetConnection = "No internet connection", // 没有网络
  NoLocalToken = "No local token", // 没有本地缓存的 token
  LocalTokenExpires = "Local token expires", // 有本地缓存的 token 但过期了

  // API 相关错误
  // -------------------------------------------------
  APIRequestFailed = "API request failed", // API 请求失败
  APIServerError = "API server error", // API 服务器错误
  APIUnknownError = "API unknown error", // API 未知错误

  // JWT 相关错误
  // -------------------------------------------------
  JWTError = "JWT error", // JWT 错误
  JWTTokenInvalid = "JWT token invalid", // JWT token 无效
  JWTTokenExpired = "JWT token expired", // JWT token 过期
  JWTDecodeError = "JWT decode error", // JWT 解析错误
}
