import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private static readonly scopes: string[] = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  private static readonly clientId: string = '366410776965-hj6lb5f05ja67122aro4qul08v45kaj7.apps.googleusercontent.com';

  public redirectToLoginPage(): boolean {
    let url: string = 'https://accounts.google.com/o/oauth2/v2/auth?';

    url += 'scope=' + LoginService.scopes.join('+');
    url += '&client_id=' + encodeURIComponent(LoginService.clientId);
    url += '&response_type=token'
    url += '&redirect_uri=' + this.getRedirectUri();

    window.location.href = url;
    return true;
  }

  private getRedirectUri(): string {
    return `${location.protocol}//${location.host}/login/callback`;
  }
}
