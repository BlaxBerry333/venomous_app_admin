export const AUTH_ENTRYPOINTS = {
  signup: {
    url: "/users/register/",
    method: "POST",
    description: "用户注册",
  },
  login: {
    url: "/users/login/",
    method: "POST",
    description: "用户登陆",
  },
  logout: {
    url: "/users/logout/",
    method: "POST",
    description: "用户退出",
  },
  refreshAccessToken: {
    url: "/users/refresh-access-token/",
    method: "POST",
    description: "刷新 Token",
  },
} as const;
