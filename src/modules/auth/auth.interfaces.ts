import { USER_ROLES_ENUM } from '@core/enums';

export interface IJwtPayload {
  uuid: string;
  email: string;
  role: USER_ROLES_ENUM;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
