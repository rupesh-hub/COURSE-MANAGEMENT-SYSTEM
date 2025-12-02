import { Component } from "@angular/core"
import { RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-unauthorized",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div class="text-center px-6">
        <h1 class="text-6xl font-bold text-red-600 mb-4">403</h1>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Access Denied</h2>
        <p class="text-lg text-gray-600 mb-8 max-w-md">
          You do not have permission to access this resource. Please contact an administrator if you believe this is an error.
        </p>
        <div class="flex gap-4 justify-center">
          <a 
            routerLink="/dashboard" 
            class="px-8 py-3 from-sage to-sage-dark/90 text-white rounded-lg hover:sage-dark transition"
          >
            Go to Dashboard
          </a>
          <a 
            routerLink="/" 
            class="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class UnauthorizedComponent {}
