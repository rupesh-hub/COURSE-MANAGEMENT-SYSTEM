import { Injectable, inject } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { ROLES, ROLE_PERMISSIONS, UserRoleType } from "../constants/role.constants"

export interface Role {
  id: number
  name: string
  description: string
  permissions: string[]
  createdOn: string
}

@Injectable({
  providedIn: "root",
})
export class RoleService {
  private http = inject(HttpClient)
  private rolesSubject = new BehaviorSubject<Role[]>([])
  public roles$ = this.rolesSubject.asObservable()

  constructor() {
    this.loadMockRoles()
  }

  private loadMockRoles(): void {
    const mockRoles: Role[] = [
      {
        id: 1,
        name: ROLES.ADMIN,
        description: "Administrator with full system access",
        permissions: ROLE_PERMISSIONS.ROLE_ADMIN,
        createdOn: new Date().toISOString(),
      },
      {
        id: 2,
        name: ROLES.INSTRUCTOR,
        description: "Instructor who can create and manage courses",
        permissions: ROLE_PERMISSIONS.ROLE_LECTURER,
        createdOn: new Date().toISOString(),
      },
      {
        id: 3,
        name: ROLES.STUDENT,
        description: "Student with access to courses and learning materials",
        permissions: ROLE_PERMISSIONS.ROLE_USER,
        createdOn: new Date().toISOString(),
      },
    ]
    this.rolesSubject.next(mockRoles)
  }

  getRoles(): Observable<Role[]> {
    return this.roles$
  }

  getPermissions(role: UserRoleType): string[] {
    return ROLE_PERMISSIONS[role] || []
  }

  hasPermission(role: UserRoleType, permission: string): boolean {
    const permissions = this.getPermissions(role)
    return permissions.includes(permission)
  }

  checkAllPermissions(role: UserRoleType, permissions: string[]): boolean {
    const userPermissions = this.getPermissions(role)
    return permissions.every((p) => userPermissions.includes(p))
  }

  checkAnyPermission(role: UserRoleType, permissions: string[]): boolean {
    const userPermissions = this.getPermissions(role)
    return permissions.some((p) => userPermissions.includes(p))
  }
}
