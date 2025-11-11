export interface ILoginRequest {
  username: string;
  password: string;
  deviceId: string;
  rememberMe: boolean;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  deviceId: string;
}

export interface IRegisterRequest {
  username: string;
  password: string;
}

export interface IInfoToken {
  sub: number;
  username: string;
  role: string;
  deviceId: string;
  expiresAt: string;
}
