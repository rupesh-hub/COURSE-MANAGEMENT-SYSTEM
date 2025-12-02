import type { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { StudentDashboardComponent } from './pages/dashboard/student-dashboard/student-dashboard.component';
import { InstructorDashboardComponent } from './pages/dashboard/instructor-dashboard/instructor-dashboard.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard/admin-dashboard.component';
import { CourseListComponent } from './pages/courses/course-list/course-list.component';
import { CourseCreateComponent } from './pages/courses/course-create/course-create.component';
import { CourseEditComponent } from './pages/courses/course-edit/course-edit.component';
import { CourseDetailsComponent } from './pages/courses/course-details/course-details.component';
import { CommentListComponent } from './pages/courses/comments/comment-list/comment-list.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { RoleManagementComponent } from './pages/users/role-management/role-management.component';
import { NotificationListComponent } from './notifications/notification-list/notification-list.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { PreferencesComponent } from './settings/preferences/preferences.component';
import { authGuard } from './core/auth/guards/auth.guard';
import {
  adminGuard,
  instructorOrAdminGuard,
  roleGuard,
} from './core/auth/guards/role.guard';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { ROLES } from './core/constants/role.constants';
import { MyCoursesComponent } from './pages/courses/my-courses/my-courses.component';
import { MyLearningsComponent } from './pages/courses/my-learnings/my-learnings.component';
import { NotFoundComponent } from './shared/pages/not-found.component';
import { UnauthorizedComponent } from './shared/pages/unauthorized.component';

export const routes: Routes = [
  // Root redirect
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  // Auth routes (no guard)
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgetPasswordComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },

  // Dashboard routes (protected)
  {
    path: 'dashboard',
    canActivate: [authGuard],
    children: [
      {
        path: 'student',
        component: StudentDashboardComponent,
        canActivate: [roleGuard([ROLES.STUDENT])],
      },
      {
        path: 'instructor',
        component: InstructorDashboardComponent,
        canActivate: [roleGuard([ROLES.INSTRUCTOR])],
      },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [adminGuard],
      },
      { path: '', redirectTo: 'student', pathMatch: 'full' },
    ],
  },

  // Course routes
  {
    path: 'courses',
    canActivate: [authGuard],
    children: [
      { path: '', component: CourseListComponent },
      {
        path: 'create',
        component: CourseCreateComponent,
        canActivate: [roleGuard([ROLES.INSTRUCTOR, ROLES.ADMIN])],
      },
      {
        path: ':id/edit',
        component: CourseEditComponent,
        canActivate: [instructorOrAdminGuard],
      },
      { path: ':id', component: CourseDetailsComponent },
      { path: ':id/comments', component: CommentListComponent },
    ],
  },

  {
    path: 'my-courses',
    component: MyCoursesComponent,
    canActivate: [authGuard, roleGuard([ROLES.STUDENT])],
  },

  {
    path: 'my-learnings',
    component: MyLearningsComponent,
    canActivate: [authGuard, roleGuard([ROLES.STUDENT])],
  },

  // User management routes (admin only)
  {
    path: 'users',
    canActivate: [authGuard],
    children: [
      { path: '', component: UserListComponent, canActivate: [adminGuard] },
      { path: 'profile', component: ProfileComponent },
      {
        path: ':id/roles',
        component: RoleManagementComponent,
        canActivate: [adminGuard],
      },
    ],
  },

  // Notification routes
  {
    path: 'notifications',
    component: NotificationListComponent,
    canActivate: [authGuard],
  },

  // Settings routes
  {
    path: 'settings',
    canActivate: [authGuard],
    children: [
      { path: 'account', component: AccountSettingsComponent },
      { path: 'preferences', component: PreferencesComponent },
      { path: '', redirectTo: 'account', pathMatch: 'full' },
    ],
  },

  // Error pages
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '404', component: NotFoundComponent },

  // Fallback 404
  { path: '**', redirectTo: '404' },
];
