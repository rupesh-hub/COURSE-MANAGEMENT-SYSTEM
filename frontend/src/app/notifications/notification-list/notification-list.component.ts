import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"

interface Notification {
  id: string
  type: "course" | "payment" | "message" | "system" | "achievement"
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  actionUrl?: string
  icon: string
  color: string
}

@Component({
  selector: "cms-notification-list",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./notification-list.component.html",
  styleUrl: "./notification-list.component.scss",
})
export class NotificationListComponent implements OnInit {
  notifications: Notification[] = []
  filteredNotifications: Notification[] = []
  filterType = "all"
  filterStatus = "all"
  isLoading = false

  ngOnInit(): void {
    this.loadNotifications()
  }

  loadNotifications(): void {
    this.notifications = [
      {
        id: "1",
        type: "achievement",
        title: "Milestone Achieved!",
        message: "You completed 50% of Advanced Angular Masterclass",
        timestamp: new Date(),
        isRead: false,
        icon: "fas fa-trophy",
        color: "bg-yellow-100 text-yellow-600",
      },
      {
        id: "2",
        type: "course",
        title: "New Lesson Available",
        message: "TypeScript Complete Guide has 2 new lessons",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: false,
        actionUrl: "/courses/2",
        icon: "fas fa-book",
        color: "bg-blue-100 text-blue-600",
      },
      {
        id: "3",
        type: "payment",
        title: "Payment Successful",
        message: "Your payment of $99.99 for React Course has been confirmed",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        isRead: true,
        icon: "fas fa-credit-card",
        color: "bg-green-100 text-green-600",
      },
      {
        id: "4",
        type: "message",
        title: "Instructor Message",
        message: "John Doe replied to your comment on Lesson 5",
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        isRead: true,
        actionUrl: "/courses/1",
        icon: "fas fa-comment",
        color: "bg-purple-100 text-purple-600",
      },
      {
        id: "5",
        type: "system",
        title: "System Update",
        message: "The platform has been updated with new features",
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
        isRead: true,
        icon: "fas fa-cog",
        color: "bg-gray-100 text-gray-600",
      },
    ]
    this.applyFilters()
  }

  onFilterChange(): void {
    this.applyFilters()
  }

  private applyFilters(): void {
    let filtered = this.notifications

    if (this.filterType !== "all") {
      filtered = filtered.filter((n) => n.type === this.filterType)
    }

    if (this.filterStatus !== "all") {
      filtered = filtered.filter((n) => (this.filterStatus === "unread" ? !n.isRead : n.isRead))
    }

    this.filteredNotifications = filtered
  }

  markAsRead(notification: Notification): void {
    notification.isRead = true
  }

  markAllAsRead(): void {
    this.notifications.forEach((n) => (n.isRead = true))
    this.applyFilters()
  }

  deleteNotification(id: string): void {
    this.notifications = this.notifications.filter((n) => n.id !== id)
    this.applyFilters()
  }

  getUnreadCount(): number {
    return this.notifications.filter((n) => !n.isRead).length
  }

  formatTime(date: Date): string {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }
}
