import { Component, Input, Output, EventEmitter, HostListener, ElementRef, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/auth/auth.service";
import { NotificationService } from "../../../core/services/notification.service";

@Component({
  selector: "cms-profile-dropdown",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile-dropdown.component.html",
  styleUrl: "./profile-dropdown.component.scss",
})
export class ProfileDropdownComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private elementRef = inject(ElementRef);

  userName = "";
  userEmail = "";

  constructor() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name;
      this.userEmail = user.email;
    }
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.close.emit();
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.close.emit();
  }

  logout(): void {
    this.authService.logout();
    this.notificationService.showInfo("You have been logged out.");
    this.router.navigate(["/auth/login"]);
    this.close.emit();
  }
}
