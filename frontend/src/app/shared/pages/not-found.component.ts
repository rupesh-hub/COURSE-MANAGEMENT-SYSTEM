import { Component } from "@angular/core"
import { RouterLink } from "@angular/router"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div class="text-center px-6">
        <h1 class="text-6xl font-bold text-sage-dark mb-4">404</h1>
        <h2 class="text-3xl font-semibold text-sage mb-4">Page Not Found</h2>
        <p class="text-lg text-gray-600 mb-8 max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div class="flex gap-4 justify-center">
          <a 
            routerLink="/dashboard" 
            class="px-8 py-3 bg-sage-dark/90 text-white rounded-lg hover:bg-sage-dark transition"
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
export class NotFoundComponent {}
