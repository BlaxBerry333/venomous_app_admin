export type IAuthSignupParams = {
  username: string;
  email: string;
  password: string;
};

export type IAuthLoginParams = {
  email: string;
  password: string;
};

export type IAuthSignupResponse = {
  token: string;
};

export type IAuthLoginResponse = {
  token: string;
};
