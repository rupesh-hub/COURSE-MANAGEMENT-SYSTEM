import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_CONSTANTS } from '../constants/api.constants';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  profileImage?: string;
  role: 'admin' | 'student' | 'lecturer';
  joinDate: Date;
  subscription?: {
    type: string;
    status: 'active' | 'inactive';
    expiryDate?: Date;
    renewalDate?: Date;
  };
  completedCourses: number;
  pendingCourses: number;
  certificates: number;
  weeklyStudyHours: number;
  totalCoursesEnrolled: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private profileSubject = new BehaviorSubject<UserProfile | null>(null);
  public profile$ = this.profileSubject.asObservable();

  constructor() {
    this.loadMockProfile();
  }

  private loadMockProfile(): void {
    const mockProfile: UserProfile = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      bio: 'Passionate learner and web developer',
      profileImage:
        'https://api.dicebear.com/7.x/avataaars/svg?seed=john@example.com',
      role: 'student',
      joinDate: new Date('2023-01-15'),
      subscription: {
        type: 'Premium',
        status: 'active',
        expiryDate: new Date('2025-12-31'),
        renewalDate: new Date('2025-01-31'),
      },
      completedCourses: 12,
      pendingCourses: 3,
      certificates: 8,
      weeklyStudyHours: 15,
      totalCoursesEnrolled: 15,
    };
    this.profileSubject.next(mockProfile);
  }

  getProfile(): Observable<UserProfile | null> {
    return this.profile$;
  }

  getCurrentProfile(): UserProfile | null {
    return this.profileSubject.value;
  }

  updateProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    const current = this.profileSubject.value;
    if (current) {
      const updated = { ...current, ...profile };
      this.profileSubject.next(updated);
      return new Observable((observer) => {
        observer.next(updated);
        observer.complete();
      });
    }
    return new Observable((observer) => {
      observer.error('No profile found');
    });
  }

  uploadProfileImage(file: File): Observable<string> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const current = this.profileSubject.value;
        if (current) {
          current.profileImage = imageUrl;
          this.profileSubject.next(current);
        }
        observer.next(imageUrl);
        observer.complete();
      };
      reader.readAsDataURL(file);
    });
  }

  getUserById(userId: string): Observable<UserProfile | null> {
    return this.http
      .get<UserProfile>(
        `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.USERS.BASE}/${userId}`
      )
      .pipe(map((response) => response || null));
  }

  getAllUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.USERS.LIST}`
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(
      `${API_CONSTANTS.BASE_URL}${API_CONSTANTS.ENDPOINTS.USERS.DELETE}/${userId}`
    );
  }
}
