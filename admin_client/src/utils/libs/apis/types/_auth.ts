export type IAuthSignupParams = {
  email: string;
  username: string;
  password: string;
};

export type IAuthLoginParams = {
  username: string;
  password: string;
};

export type IAuthResetPasswordParams = {
  email: string;
};

export type IAuthVerifyPasswordParams = {
  email: string;
  code: string;
};

export type IAuthSignupResponse = {
  access_token: string;
  refresh_token: string;
};

export type IAuthLoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type IAuthResetPasswordResponse = {
  message: string;
};

export type IAuthVerifyPasswordResponse = {
  message: string;
};
