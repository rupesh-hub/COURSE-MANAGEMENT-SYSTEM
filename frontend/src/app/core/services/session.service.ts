import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, interval, type Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { LoggerService } from './logger.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private authService = inject(AuthService);
  private router = inject(Router);
  private logger = inject(LoggerService);

  private userActivitySubject = new Subject<void>();
  private sessionTimeoutSubject = new BehaviorSubject<number>(0);
  public sessionTimeout$ = this.sessionTimeoutSubject.asObservable();

  private sessionTimeout: Subscription | null = null;
  private readonly SESSION_TIMEOUT = environment.SESSION_TIMEOUT;
  private readonly WARNING_THRESHOLD = this.SESSION_TIMEOUT * 0.75; // Warn at 75%

  initializeSession(): void {
    this.setupActivityListener();
    this.startSessionTimeout();
  }

  private setupActivityListener(): void {
    this.userActivitySubject
      .pipe(
        debounceTime(500),
        tap(() => this.resetSessionTimeout())
      )
      .subscribe();
  }

  recordUserActivity(): void {
    this.userActivitySubject.next();
  }

  private startSessionTimeout(): void {
    if (this.sessionTimeout) {
      this.sessionTimeout.unsubscribe();
    }

    const startTime = Date.now();

    this.sessionTimeout = interval(1000).subscribe(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, this.SESSION_TIMEOUT - elapsedTime);

      this.sessionTimeoutSubject.next(remainingTime);

      // Warn user
      if (
        remainingTime <= this.WARNING_THRESHOLD &&
        remainingTime % 60000 === 0
      ) {
        this.logger.warn('Session expiring soon');
      }

      // Logout user
      if (remainingTime <= 0) {
        this.handleSessionExpiry();
      }
    });
  }

  private resetSessionTimeout(): void {
    this.startSessionTimeout();
  }

  private handleSessionExpiry(): void {
    this.logger.warn('Session expired due to inactivity');
    this.authService.logout();
    this.router.navigate(['/auth/login'], {
      queryParams: { reason: 'session_expired' },
    });
  }

  endSession(): void {
    if (this.sessionTimeout) {
      this.sessionTimeout.unsubscribe();
    }
    this.userActivitySubject.complete();
  }
}
