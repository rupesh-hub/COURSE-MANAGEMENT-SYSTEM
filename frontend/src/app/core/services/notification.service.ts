import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"

export interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  message: string
  duration?: number
  timestamp: Date
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([])
  public notifications$ = this.notificationsSubject.asObservable()

  private notificationIdCounter = 0
  private readonly DEFAULT_DURATION = 5000 // 5 seconds

  getNotifications(): Observable<Notification[]> {
    return this.notifications$
  }

  showSuccess(message: string, duration: number = this.DEFAULT_DURATION): void {
    this.addNotification("success", message, duration)
  }

  showError(message: string, duration: number = this.DEFAULT_DURATION): void {
    this.addNotification("error", message, duration)
  }

  showWarning(message: string, duration: number = this.DEFAULT_DURATION): void {
    this.addNotification("warning", message, duration)
  }

  showInfo(message: string, duration: number = this.DEFAULT_DURATION): void {
    this.addNotification("info", message, duration)
  }

  private addNotification(type: "success" | "error" | "warning" | "info", message: string, duration: number): void {
    const notification: Notification = {
      id: `notification-${this.notificationIdCounter++}`,
      type,
      message,
      duration,
      timestamp: new Date(),
    }

    const notifications = this.notificationsSubject.value
    this.notificationsSubject.next([notification, ...notifications])

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id)
      }, duration)
    }
  }

  removeNotification(id: string): void {
    const notifications = this.notificationsSubject.value.filter((n) => n.id !== id)
    this.notificationsSubject.next(notifications)
  }

  clearAllNotifications(): void {
    this.notificationsSubject.next([])
  }
}
