import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from './services/auth/login.service';
import { AuthService } from './services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatMenuModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'memora';

  constructor(
    private loginService: LoginService,
    private authService: AuthService
  ) { }

  protected onLoginClicked() {
    this.loginService.redirectToLoginPage();
  }

  protected onLogoutClicked() {
    this.authService.clear();
  }

  protected isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  protected getUserName(): string {
    return this.authService.getUserName();
  }
}
