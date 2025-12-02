import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, type Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type {
  ChangePasswordRequest,
  GlobalResponse,
  UserResponse,
} from '../../pages/auth/model/auth.model';
import { TokenService } from './token.service';
import { API_ROLE_MAP, ROLES, UserRoleType } from '../constants/role.constants';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { API_CONSTANTS } from '../constants';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  profileImage?: string;
  username?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const storedToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (storedUser && storedToken) {
      try {
        const user: User = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        this.tokenService.setTokenExpiry();
      } catch (error) {
        console.error('[AuthService] Error parsing stored user:', error);
        this.clearAuthData();
      }
    }
  }

  login(authRequest: any): Observable<boolean> {
    return this.http
      .post<any>(
        `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.AUTH.LOGIN}`,
        authRequest
      )
      .pipe(
        map((response: any) => {
          const access = response.token || response.accessToken;
          const refresh = response.refresh_token || response.refreshToken;

          if (!access) {
            throw new Error('API did not return a token');
          }

          // Save tokens
          this.tokenService.setTokens(access, refresh || '');

          // Fix flexible role support
          const roles = Array.isArray(response.roles)
            ? response.roles
            : response.role
            ? [response.role]
            : [];

          const userRole = this.mapApiRoleToUserRole(roles);

          const user: User = {
            id: response.id ?? response.username ?? '',
            name: response.name ?? '',
            email: response.email ?? '',
            username: response.username ?? '',
            role: userRole,
            profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${response.email}`,
          };

          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);

          return true;
        }),
        catchError((err) => {
          console.error('[AuthService] Login error:', err);
          return of(false);
        })
      );
  }

  logout(): void {
    this.clearAuthData();
  }

  private clearAuthData(): void {
    this.tokenService.clearTokens();
    localStorage.removeItem(STORAGE_KEYS.USER);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private mapApiRoleToUserRole(roles: string[]): UserRoleType {
    if (!roles || roles.length === 0) return ROLES.STUDENT;

    for (const role of roles) {
      if (API_ROLE_MAP[role]) {
        return API_ROLE_MAP[role];
      }
    }
    return ROLES.STUDENT; // Default role
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  hasRole(role: UserRoleType): boolean {
    return this.currentUserSubject.value?.role === role;
  }

  hasAnyRole(roles: UserRoleType[]): boolean {
    const userRole = this.currentUserSubject.value?.role;
    return userRole ? roles.includes(userRole) : false;
  }

  forgetPasswordRequest(email: string): Observable<any> {
    return this.http
      .post(
        `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.AUTH.FORGET_PASSWORD}`,
        { email }
      )
      .pipe(
        catchError((error) => {
          console.error('[AuthService] Forget password error:', error);
          return of(null);
        })
      );
  }

  changePasswordRequest(request: ChangePasswordRequest): Observable<any> {
    return this.http
      .post(
        `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.AUTH.CHANGE_PASSWORD}`,
        request
      )
      .pipe(
        map((response: GlobalResponse<any>) => response?.data || null),
        catchError((error) => {
          console.error('[AuthService] Change password error:', error);
          return of(null);
        })
      );
  }

  register(formData: FormData): Observable<UserResponse> {
    return this.http
      .post(
        `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.AUTH.REGISTER}`,
        formData
      )
      .pipe(
        map((response: GlobalResponse<UserResponse>) => response?.data || null),
        catchError(() => of(null))
      );
  }

  userByUsername(username: string): Observable<UserResponse | null> {
    return this.http
      .get<GlobalResponse<UserResponse>>(
        `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.USERS.BY_USERNAME}/${username}`
      )
      .pipe(
        map((response: GlobalResponse<UserResponse>) => response?.data || null),
        catchError(() => of(null))
      );
  }

  userByEmail(email: string): Observable<UserResponse | null> {
    return this.http
      .get<GlobalResponse<UserResponse>>(
        `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.USERS.BY_EMAIL}/${email}`
      )
      .pipe(
        map((response: GlobalResponse<UserResponse>) => response?.data || null),
        catchError(() => of(null))
      );
  }
}
