import { IAuthToken } from "./IAuthToken";
import { IAuth } from "./IAuth";

export interface IAuthResponse extends IAuth, IAuthToken {}
