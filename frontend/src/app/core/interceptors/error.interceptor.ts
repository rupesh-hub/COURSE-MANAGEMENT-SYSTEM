import type { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http"
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { catchError, throwError } from "rxjs"
import { NotificationService } from "../services/notification.service"

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const notificationService = inject(NotificationService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = "An error occurred. Please try again later."

      // Handle different error status codes
      switch (error.status) {
        case 0:
          errorMessage = "Network error. Please check your internet connection."
          break
        case 400:
          errorMessage = error.error?.message || "Bad request. Please check your input."
          break
        case 401:
          errorMessage = "Unauthorized. Please login again."
          break
        case 403:
          errorMessage = "Forbidden. You do not have permission to access this resource."
          break
        case 404:
          errorMessage = "Resource not found."
          break
        case 409:
          errorMessage = error.error?.message || "Conflict. Please try again."
          break
        case 422:
          errorMessage = "Validation error. Please check your input."
          break
        case 429:
          errorMessage = "Too many requests. Please try again later."
          break
        case 500:
          errorMessage = "Server error. Please try again later."
          break
        case 502:
          errorMessage = "Bad gateway. Please try again later."
          break
        case 503:
          errorMessage = "Service unavailable. Please try again later."
          break
        default:
          errorMessage = error.error?.message || errorMessage
      }

      // Log error for debugging
      console.error("[Error Interceptor]", error)

      // Show error notification
      notificationService.showError(errorMessage)

      // Redirect to unauthorized page for 403 errors
      if (error.status === 403) {
        router.navigate(["/unauthorized"])
      }

      return throwError(() => ({
        status: error.status,
        message: errorMessage,
        originalError: error,
      }))
    }),
  )
}
