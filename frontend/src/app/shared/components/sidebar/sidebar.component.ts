import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { AuthService } from "../../../core/auth/auth.service"
import { ROLES } from "../../../core/constants/role.constants"

interface SidebarLink {
  label: string
  icon: string
  route: string
  roles: string[]
  divider?: boolean
}

@Component({
  selector: "cms-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService)
  isAuthenticated$ = this.authService.isAuthenticated$
  visibleLinks: SidebarLink[] = []
  protected ROLES = ROLES

  private studentLinks: SidebarLink[] = [
    { label: "Dashboard", icon: "fas fa-home", route: "/dashboard/student", roles: [ROLES.STUDENT] },
    { label: "My Courses", icon: "fas fa-book", route: "/my-courses", roles: [ROLES.STUDENT] },
    { label: "My Learnings", icon: "fas fa-graduation-cap", route: "/my-learnings", roles: [ROLES.STUDENT] },
    { label: "Browse Courses", icon: "fas fa-search", route: "/courses", roles: [ROLES.STUDENT] },
    { divider: true, label: "", icon: "", route: "", roles: [] },
    { label: "Notifications", icon: "fas fa-bell", route: "/notifications", roles: [ROLES.STUDENT] },
    { label: "Settings", icon: "fas fa-cog", route: "/settings/account", roles: [ROLES.STUDENT] },
  ]

  private instructorLinks: SidebarLink[] = [
    { label: "Dashboard", icon: "fas fa-home", route: "/dashboard/instructor", roles: [ROLES.INSTRUCTOR] },
    { label: "My Courses", icon: "fas fa-book", route: "/courses", roles: [ROLES.INSTRUCTOR] },
    { label: "Create Course", icon: "fas fa-plus-circle", route: "/courses/create", roles: [ROLES.INSTRUCTOR] },
    { divider: true, label: "", icon: "", route: "", roles: [] },
    { label: "Notifications", icon: "fas fa-bell", route: "/notifications", roles: [ROLES.INSTRUCTOR] },
    { label: "Settings", icon: "fas fa-cog", route: "/settings/account", roles: [ROLES.INSTRUCTOR] },
  ]

  private adminLinks: SidebarLink[] = [
    { label: "Dashboard", icon: "fas fa-home", route: "/dashboard/admin", roles: [ROLES.ADMIN] },
    { label: "Users", icon: "fas fa-users", route: "/users", roles: [ROLES.ADMIN] },
    { label: "Courses", icon: "fas fa-book", route: "/courses", roles: [ROLES.ADMIN] },
    { divider: true, label: "", icon: "", route: "", roles: [] },
    { label: "Notifications", icon: "fas fa-bell", route: "/notifications", roles: [ROLES.ADMIN] },
    { label: "Settings", icon: "fas fa-cog", route: "/settings/account", roles: [ROLES.ADMIN] },
  ]

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.filterSidebarLinks(user.role)
      }
    })
  }

  private filterSidebarLinks(role: string): void {
    let links: SidebarLink[] = []

    switch (role) {
      case ROLES.STUDENT:
        links = this.studentLinks
        break
      case ROLES.INSTRUCTOR:
        links = this.instructorLinks
        break
      case ROLES.ADMIN:
        links = this.adminLinks
        break
    }

    this.visibleLinks = links.filter((link) => link.divider || link.roles.includes(role))
  }
}
