import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { type Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  STORAGE_KEYS,
  TOKEN_EXPIRY_BUFFER,
} from '../constants/storage.constants';
import { API_CONSTANTS } from '../constants';

interface TokenResponse {
  token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private http = inject(HttpClient);
  private tokenExpirySubject = new BehaviorSubject<number | null>(null);
  public tokenExpiry$ = this.tokenExpirySubject.asObservable();

  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    this.setTokenExpiry();
  }

  setTokenExpiry(): void {
    // Decode JWT to get expiry
    const token = this.getAccessToken();

    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = decoded.exp * 1000;
        this.tokenExpirySubject.next(expiryTime);
      } catch (error) {
        console.error('[TokenService] Error decoding token:', error);
      }
    }
  }

  isTokenExpired(): boolean {
    const expiryTime = this.tokenExpirySubject.value;
    if (!expiryTime) return true;
    return Date.now() >= expiryTime - TOKEN_EXPIRY_BUFFER;
  }
  
  refreshAccessToken(): Observable<TokenResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${refreshToken}`,
    });

    return this.http
      .post<TokenResponse>(
        `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.AUTH.REFRESH}`,
        {},
        { headers }
      )
      .pipe(
        map((response) => {
          this.setTokens(response.token, response.refresh_token);
          return response;
        }),
        catchError((error) => {
          console.error('[TokenService] Token refresh failed:', error);
          return throwError(() => error);
        })
      );
  }

  clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    this.tokenExpirySubject.next(null);
  }

  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('[TokenService] Error decoding token:', error);
      return null;
    }
  }
}
