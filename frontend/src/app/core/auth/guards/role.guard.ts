import {
  type CanActivateFn,
  Router,
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { ROLES, UserRoleType } from '../../constants/role.constants';
import { inject } from '@angular/core';

export const roleGuard: (allowedRoles: UserRoleType[]) => CanActivateFn =
  (allowedRoles: UserRoleType[]) =>
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const user = authService.getCurrentUser();

    if (user && allowedRoles.includes(user.role)) {
      return true;
    }

    router.navigate(['/unauthorized']);
    return false;
  };

// Convenience guards for common roles
export const adminGuard: CanActivateFn = roleGuard([ROLES.ADMIN]);
export const instructorGuard: CanActivateFn = roleGuard([ROLES.INSTRUCTOR]);
export const studentGuard: CanActivateFn = roleGuard([ROLES.STUDENT]);
export const instructorOrAdminGuard: CanActivateFn = roleGuard([
  ROLES.INSTRUCTOR,
  ROLES.ADMIN,
]);
