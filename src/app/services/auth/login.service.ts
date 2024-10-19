import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/auth/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private static readonly scopes: string[] = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  private static readonly clientId: string = '366410776965-hj6lb5f05ja67122aro4qul08v45kaj7.apps.googleusercontent.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  public redirectToLoginPage(): boolean {
    let url: string = 'https://accounts.google.com/o/oauth2/v2/auth?';

    url += 'scope=' + LoginService.scopes.join('+');
    url += '&client_id=' + encodeURIComponent(LoginService.clientId);
    url += '&response_type=token'
    url += '&redirect_uri=' + this.getRedirectUri();

    window.location.href = url;
    return true;
  }

  public getUserInfo(accessToken: string): Observable<UserInfo> {
    return new Observable<UserInfo>(observer => {
      this.httpClient.get<UserInfoResponse>('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      }).subscribe({
        next: (response: UserInfoResponse) => {
          let userInfo = this.toUserInfo(response);
          observer.next(userInfo);
        },
        error: (error: any) => {
          observer.error(error);
        },
        complete: () => {
          observer.complete();
        }
      });
    });
  };

  private toUserInfo(response: UserInfoResponse): UserInfo {
    return new UserInfo(
      response.id,
      response.email,
      response.name,
      response.given_name,
      response.family_name
    );
  }

  private getRedirectUri(): string {
    return `${location.protocol}//${location.host}/login/callback`;
  }
}

class UserInfoResponse {
  public id: string = '';
  public email: string = '';
  public name: string = '';
  public picture: string = '';
  public given_name: string = '';
  public family_name: string = '';
  public verified_email: boolean = false;
}