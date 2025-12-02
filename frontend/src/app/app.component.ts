import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {AuthService} from './core/auth/auth.service';
import {AsyncPipe, CommonModule} from '@angular/common';

export interface Data {
  message: string
}

@Component({
  selector: 'cms-root',
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, AsyncPipe, CommonModule],
  template: `
    <div class="min-h-screen bg-cream">
      <cms-navbar></cms-navbar>

      <div class="flex">
        <!-- Sidebar -->
        <cms-sidebar *ngIf="authService.isAuthenticated$ | async"></cms-sidebar>

        <!-- Main Content -->
        <main
          class="flex-1 pt-16"
          [class.lg:ml-64]="authService.isAuthenticated$ | async">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>

  `,
  standalone: true
})
export class AppComponent  {

  protected authService:AuthService = inject(AuthService);



}
