import {Routes} from '@angular/router';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
import {ForgetPasswordComponent} from './pages/auth/forget-password/forget-password.component';
import {ChangePasswordComponent} from './pages/auth/change-password/change-password.component';
import {StudentDashboardComponent} from './pages/dashboard/student-dashboard/student-dashboard.component';
import {InstructorDashboardComponent} from './pages/dashboard/instructor-dashboard/instructor-dashboard.component';
import {AdminDashboardComponent} from './pages/dashboard/admin-dashboard/admin-dashboard.component';
import {CourseListComponent} from './pages/courses/course-list/course-list.component';
import {CourseCreateComponent} from './pages/courses/course-create/course-create.component';
import {CourseEditComponent} from './pages/courses/course-edit/course-edit.component';
import {CourseDetailsComponent} from './pages/courses/course-details/course-details.component';
import {CommentListComponent} from './pages/courses/comments/comment-list/comment-list.component';
import {UserListComponent} from './pages/users/user-list/user-list.component';
import {UserProfileComponent} from './pages/users/user-profile/user-profile.component';
import {RoleManagementComponent} from './pages/users/role-management/role-management.component';
import {NotificationListComponent} from './notifications/notification-list/notification-list.component';
import {AccountSettingsComponent} from './settings/account-settings/account-settings.component';
import {PreferencesComponent} from './settings/preferences/preferences.component';

export const routes: Routes = [

  // ROOT → redirect to /auth/login
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // AUTH PARENT
  {
    path: 'auth',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'forget-password', component: ForgetPasswordComponent},
      {path: 'change-password', component: ChangePasswordComponent},

      // Default under /auth redirects to login
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ]
  },

  // DASHBOARD
  {
    path: 'dashboard',
    children: [
      {path: 'student', component: StudentDashboardComponent},
      {path: 'instructor', component: InstructorDashboardComponent},
      {path: 'admin', component: AdminDashboardComponent},
      {path: 'profile', component: UserProfileComponent},
      {path: '', redirectTo: 'student', pathMatch: 'full'}
    ]
  },

  // COURSES
  {
    path: 'courses',
    children: [
      {path: '', component: CourseListComponent},                 // /courses
      {path: 'create', component: CourseCreateComponent},         // instructor
      {path: ':id/edit', component: CourseEditComponent},         // instructor
      {path: ':id', component: CourseDetailsComponent},           // student/instructor
      {path: ':id/comments', component: CommentListComponent}     // comments
    ]
  },

  // USERS (Admin only section)
  {
    path: 'users',
    children: [
      {path: '', component: UserListComponent},                   // /users
      {path: ':id', component: UserProfileComponent},             // /users/123
      {path: ':id/roles', component: RoleManagementComponent}     // /users/123/roles
    ]
  },

  // NOTIFICATIONS
  {
    path: 'notifications',
    component: NotificationListComponent
  },

  // SETTINGS
  {
    path: 'settings',
    redirectTo: '',
    pathMatch: 'full',
    children: [
      {
        path: 'account',
        component: AccountSettingsComponent
      },
      {
        path: 'preferences',
        component: PreferencesComponent
      }
    ]
  },

  // FALLBACK 404
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
