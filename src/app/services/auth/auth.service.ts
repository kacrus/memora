import { Injectable } from '@angular/core';
import { AuthData } from '../../models/auth/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly accessTokenKey: string = 'access_token';
  private readonly tokenTypeKey: string = 'token_type';
  private readonly expiresInKey: string = 'expires_in';
  private readonly userInfoIdKey: string = 'user_info_id';
  private readonly userInfoEmailKey: string = 'user_info_email';
  public readonly userInfoNameKey: string = 'user_info_name';
  public readonly userInfoGivenNameKey: string = 'user_info_given_name';
  public readonly userInfoFamilyNameKey: string = 'user_info_family_name';

  constructor() { }

  public save(data: AuthData): void {
    sessionStorage.setItem(this.accessTokenKey, data.accessToken);
    sessionStorage.setItem(this.tokenTypeKey, data.tokenType);
    sessionStorage.setItem(this.expiresInKey, data.expiresIn.toString());
    sessionStorage.setItem(this.userInfoIdKey, data.userInfo.id);
    sessionStorage.setItem(this.userInfoEmailKey, data.userInfo.email);
    sessionStorage.setItem(this.userInfoNameKey, data.userInfo.name);
    sessionStorage.setItem(this.userInfoGivenNameKey, data.userInfo.givenName);
    sessionStorage.setItem(this.userInfoFamilyNameKey, data.userInfo.familyName);
  }

  public getAccessToken(): string {
    return sessionStorage.getItem(this.accessTokenKey) ?? '';
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  public getUserName(): string {
    let name = sessionStorage.getItem(this.userInfoNameKey) ?? '';
    return name;
  }

  public clear(): void {
    sessionStorage.removeItem(this.accessTokenKey);
    sessionStorage.removeItem(this.tokenTypeKey);
    sessionStorage.removeItem(this.expiresInKey);
    sessionStorage.removeItem(this.userInfoIdKey);
    sessionStorage.removeItem(this.userInfoEmailKey);
    sessionStorage.removeItem(this.userInfoNameKey);
    sessionStorage.removeItem(this.userInfoGivenNameKey);
    sessionStorage.removeItem(this.userInfoFamilyNameKey);
  }
}