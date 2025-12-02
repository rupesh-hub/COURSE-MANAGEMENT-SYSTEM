export const ROLES = {
    ADMIN: "ROLE_ADMIN",
    INSTRUCTOR: "ROLE_LECTURER",
    STUDENT: "ROLE_USER",
  } as const
  
  export type UserRoleType = (typeof ROLES)[keyof typeof ROLES]
  
  export const ROLE_PERMISSIONS: Record<UserRoleType, string[]> = {
    [ROLES.ADMIN]: ["manage_users", "manage_courses", "manage_roles", "view_reports"],
    [ROLES.INSTRUCTOR]: ["create_courses", "manage_own_courses", "view_students"],
    [ROLES.STUDENT]: ["view_courses", "enroll_courses", "view_progress"],
  }
  
  // API role mapping
  export const API_ROLE_MAP: Record<string, UserRoleType> = {
    ROLE_ADMIN: ROLES.ADMIN,
    ROLE_LECTURER: ROLES.INSTRUCTOR,
    ROLE_USER: ROLES.STUDENT,
  }
  