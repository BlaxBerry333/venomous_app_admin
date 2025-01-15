export type PostUserRegisterResponse = DRFTokensType;

export type PostUserRegisterParameterType = Pick<DRFUserType, "username" | "email" | "password">;

export type PostUserLoginResponse = DRFTokensType;

export type PostUserLoginParameterType = Pick<DRFUserType, "username" | "password">;

export type PostUserRefreshAccessTokenResponse = DRFTokensType;

export type PostUserRefreshAccessTokenParameterType = Pick<DRFTokensType, "refresh_token">;

export type PostVisitorLoginResponse = PostUserLoginResponse;

export type GetUserProfileResponse = Omit<DRFUserType, "password">;

// ----------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------

export type DRFTokensType = {
  access_token: string;
  refresh_token: string;
};

export type DRFUserType = {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  last_login: string; // 用户最后登录的日期
  date_joined: string; // 用户注册的日期
  is_active: boolean; // 用户是否处于激活状态。一个被禁用的用户将无法登录
  is_staff: boolean; // 用户是否是站点管理员，可以控制该用户是否能访问 Django 管理后台
  is_superuser: boolean; // 用户是否是超级用户，拥有所有权限
};
