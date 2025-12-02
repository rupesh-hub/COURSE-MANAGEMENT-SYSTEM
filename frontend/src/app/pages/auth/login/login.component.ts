import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthenticationRequest } from '../model/auth.model';
import { ROLES } from '../../../core/constants/role.constants';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'cms-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styles: [],
  standalone: true,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);

  protected authRequest: AuthenticationRequest = {
    username: 'dulal.rupesh@gmail.com',
    password: 'Rupesh@123',
  };

  passwordVisible = false;
  isLoading = false;
  errorMessage = '';

  toggleVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  protected onLogin = (): void => {
    if (!this.authRequest.username || !this.authRequest.password) {
      this.errorMessage = 'Username and password are required';
      this.notificationService.showError(this.errorMessage);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.authRequest).subscribe({
      next: (response) => {
        if (response) {
          const user = this.authService.getCurrentUser();

          // Navigate to appropriate dashboard based on role
          if (user) {
            let dashboardRoute = '/dashboard/student'; // default
            switch (user.role) {
              case ROLES.ADMIN:
                dashboardRoute = '/dashboard/admin';
                break;
              case ROLES.INSTRUCTOR:
                dashboardRoute = '/dashboard/instructor';
                break;
              case ROLES.STUDENT:
                dashboardRoute = '/dashboard/student';
                break;
            }

            this.notificationService.showSuccess(`Welcome ${user.name}!`);
            this.router.navigate([dashboardRoute]);
          }
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.notificationService.showError(this.errorMessage);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('[LoginComponent] Login error:', err);
        this.errorMessage =
          err?.error?.message || 'Login failed. Please try again.';
        this.notificationService.showError(this.errorMessage);
        this.isLoading = false;
      },
    });
  };
}
