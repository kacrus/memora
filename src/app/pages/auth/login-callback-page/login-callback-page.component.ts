import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../services/auth/login.service';
import { AuthData } from '../../../models/auth/auth-data.model';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-callback-page',
  standalone: true,
  imports: [],
  template: '',
})
export class LoginCallbackPageComponent {
  private readonly accessTokenKey: string = 'access_token';
  private readonly tokenTypeKey: string = 'token_type';
  private readonly expiresInKey: string = 'expires_in';

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    let fragment = this.activatedRoute.snapshot.fragment ?? "";
    let params = new URLSearchParams(fragment);

    let accessToken = params.get(this.accessTokenKey);
    let tokenType = params.get(this.tokenTypeKey);
    let expiresIn = params.get(this.expiresInKey);

    if (!accessToken || !tokenType || !expiresIn) {
      this.toastrService.error('Invalid login callback');
      return;
    }

    this.loginService
      .getUserInfo(accessToken)
      .subscribe({
        next: (userInfo) => {
          let authData = new AuthData(accessToken, tokenType, parseInt(expiresIn), userInfo);
          this.authService.save(authData);
          this.router.navigate(['']);
        },
        error: (error) => {
          this.toastrService.error('Failed to get user info');
          console.log("Failed to get user info", error);
        }
      });
  }
}