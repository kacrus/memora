import { UserInfo } from "./user-info.model";

export class AuthData {
  public readonly accessToken: string;
  public readonly tokenType: string;
  public readonly expiresIn: number;
  public readonly userInfo: UserInfo;

  constructor(accessToken: string, tokenType: string, expiresIn: number, userInfo: UserInfo) {
    this.accessToken = accessToken;
    this.tokenType = tokenType;
    this.expiresIn = expiresIn;
    this.userInfo = userInfo;
  }
}