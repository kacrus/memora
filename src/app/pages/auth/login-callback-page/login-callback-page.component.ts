import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-callback-page',
  standalone: true,
  imports: [],
  templateUrl: './login-callback-page.component.html'
})
export class LoginCallbackPageComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    let fragment = this.activatedRoute.snapshot.fragment ?? "";
    let params = new URLSearchParams(fragment);

    let accessToken = params.get('access_token');
    let tokenType = params.get('token_type');
    let expiresIn = params.get('expires_in');

    if (!accessToken || !tokenType || !expiresIn) {
      console.error('Failed to get access token');
      return;
    }
  }
}