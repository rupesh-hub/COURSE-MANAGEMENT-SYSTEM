import { Component, type OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../core/auth/auth.service";
import { RouterModule } from "@angular/router";
import { ProfileDropdownComponent } from "../profile-dropdown/profile-dropdown.component";
import { ROLES } from "../../../core/constants/role.constants";

interface NavLink {
  label: string;
  icon: string;
  route: string;
  roles: string[];
}

@Component({
  selector: "cms-navbar",
  imports: [CommonModule, RouterModule, ProfileDropdownComponent],
  standalone: true,
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);

  isProfileMenuOpen = false;
  currentUser$ = this.authService.currentUser$;
  isAuthenticated$ = this.authService.isAuthenticated$;
  visibleLinks: NavLink[] = [];
  protected ROLES = ROLES;

  private allLinks: NavLink[] = [
    { label: "Courses", icon: "fas fa-book-open", route: "/courses", roles: [ROLES.STUDENT, ROLES.INSTRUCTOR, ROLES.ADMIN] },
    { label: "My Learning", icon: "fas fa-graduation-cap", route: "/my-learnings", roles: [ROLES.STUDENT] },
    { label: "Teaching", icon: "fas fa-chalkboard-user", route: "/dashboard/instructor", roles: [ROLES.INSTRUCTOR] },
    { label: "Administration", icon: "fas fa-cog", route: "/dashboard/admin", roles: [ROLES.ADMIN] },
  ]; 

  ngOnInit(): void {
    this.currentUser$.subscribe((user) => {
      if (user) this.filterNavLinks(user.role);
    });
  }

  private filterNavLinks(role: string): void {
    this.visibleLinks = this.allLinks.filter((link) => link.roles.includes(role));
  }

  toggleProfileMenu(event: MouseEvent): void {
    event.stopPropagation(); // prevent immediate close
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen = false;
  }
}
