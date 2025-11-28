src/
├── app/
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.component.ts
│
│   ├── core/        // Core logic (auth, guards, services, interceptors)
│   │   ├── auth/
│   │   │   ├── auth.service.ts
│   │   │   ├── token.service.ts
│   │   │   ├── role.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   ├── role.guard.ts
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── roles.enum.ts
│   │   │
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   │
│   │   ├── services/
│   │   │   ├── api.service.ts
│   │   │   ├── notification.service.ts
│   │   │   ├── course.service.ts
│   │   │   ├── user.service.ts
│
│   ├── shared/       // Reusable UI elements
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── modal/
│   │   │   ├── avatar/
│   │   │   ├── spinner/
│   │   ├── directives/
│   │   │   ├── role.directive.ts   // Role-based UI show/hide directive
│   │   ├── pipes/
│   │   │   ├── date.pipe.ts
│
│   ├── pages/        // Feature pages (standalone components)
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts (standalone)
│   │   │   ├── register/
│   │   │   │   ├── register.component.ts
│   │   │   ├── forgot-password/
│   │   │       ├── forgot-password.component.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── student-dashboard/
│   │   │   │   ├── student-dashboard.component.ts
│   │   │   ├── instructor-dashboard/
│   │   │   │   ├── instructor-dashboard.component.ts
│   │   │   ├── admin-dashboard/
│   │   │       ├── admin-dashboard.component.ts
│   │   │
│   │   ├── courses/
│   │   │   ├── course-list/
│   │   │   │   ├── course-list.component.ts
│   │   │   ├── course-create/
│   │   │   │   ├── course-create.component.ts
│   │   │   ├── course-edit/
│   │   │   │   ├── course-edit.component.ts
│   │   │   ├── course-details/
│   │   │       ├── course-details.component.ts
│   │   │       ├── comments/
│   │   │           ├── comment-list.component.ts
│   │   │           ├── comment-add.component.ts
│   │   │
│   │   ├── users/
│   │   │   ├── user-list/           // Admin only
│   │   │   ├── user-profile/
│   │   │   ├── role-management/     // Admin only
│   │   │
│   │   ├── notifications/
│   │   │   ├── notification-list.component.ts
│   │   │
│   │   ├── settings/
│   │       ├── account-settings.component.ts
│   │       ├── preferences.component.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── styles/
│       ├── global.scss
│
├── environments/
│   ├── environment.ts
│   ├── environment.production.ts
└── main.ts


/
├── login
├── register
├── forgot-password
├── dashboard
│   ├── student
│   ├── instructor
│   └── admin
│
├── courses
│   ├── (student/instructor both)
│   │   ├── ''
│   │   ├── :id
│   │   ├── :id/comments
│
│   ├── (instructor only)
│       ├── create
│       └── :id/edit
│
├── notifications
│   └── ''
│
├── users  (admin only)
│   ├── ''
│   ├── :id
│   └── roles
│
├── profile
├── settings
└── **

