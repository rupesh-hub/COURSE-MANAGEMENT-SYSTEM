import type {
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../auth/token.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  // Get access token
  const token = tokenService.getAccessToken();

  // If token exists, add it to request headers
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        !req.url.includes('/authenticate') &&
        !req.url.includes('/register')
      ) {
        return tokenService.refreshAccessToken().pipe(
          switchMap(() => {
            // Retry the original request with new token
            const newToken = tokenService.getAccessToken();
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            // Refresh failed, logout user
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
