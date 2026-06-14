import { IAuth } from "./IAuth";

export interface IUser extends Omit<IAuth, 'accessToken' | 'refreshToken'> {
  username: string;
  password: string;
  expiresInMins?: number;
}
