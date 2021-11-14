export interface IJwtPayload {
  uuid: string;
  email: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
