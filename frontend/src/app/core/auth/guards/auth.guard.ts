import {
  Router,
  CanActivateFn,
  ActivatedRouteSnapshot,
  type RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  const tokenExpired = tokenService.isTokenExpired();
  if (isAuthenticated && !tokenExpired) {
    return true;
  }

  if (tokenExpired) {
    authService.logout();
  }

  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url },
  });

  return false;
};
