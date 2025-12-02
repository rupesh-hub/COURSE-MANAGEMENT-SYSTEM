import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"
import { AuthService } from "../../../core/auth/auth.service"

interface DashboardCard {
  title: string
  value: string | number
  icon: string
  color: string
  trend?: string
}

@Component({
  selector: "cms-admin-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./admin-dashboard.component.html",
  styleUrl: "./admin-dashboard.component.scss",
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardCard[] = []
  recentUsers: any[] = []
  recentCourses: any[] = []
  recentActivity: any[] = []

  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router)

  ngOnInit(): void {
    this.initializeStats()
    this.loadRecentUsers()
    this.loadRecentCourses()
    this.loadRecentActivity()
  }

  private initializeStats(): void {
    this.stats = [
      {
        title: "Total Users",
        value: 1250,
        icon: "fas fa-users",
        color: "bg-blue-100",
        trend: "+45 this month",
      },
      {
        title: "Total Courses",
        value: 156,
        icon: "fas fa-book",
        color: "bg-sage-light",
        trend: "+12 this month",
      },
      {
        title: "Total Revenue",
        value: "$48,500",
        icon: "fas fa-dollar-sign",
        color: "bg-green-100",
        trend: "+15% this month",
      },
      {
        title: "Active Students",
        value: 892,
        icon: "fas fa-graduation-cap",
        color: "bg-purple-100",
        trend: "+23% this week",
      },
    ]
  }

  private loadRecentUsers(): void {
    this.recentUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "student", joinDate: "2025-01-15", status: "active" },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "lecturer",
        joinDate: "2025-01-14",
        status: "active",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "student",
        joinDate: "2025-01-13",
        status: "inactive",
      },
    ]
  }

  private loadRecentCourses(): void {
    this.recentCourses = [
      { id: 1, title: "Angular Masterclass", instructor: "Maximilian", students: 1250, rating: 4.8 },
      { id: 2, title: "React Advanced", instructor: "Jonas", students: 980, rating: 4.9 },
      { id: 3, title: "Python Basics", instructor: "Jose", students: 750, rating: 4.6 },
    ]
  }

  private loadRecentActivity(): void {
    this.recentActivity = [
      { type: "user_signup", message: "New user signed up", timestamp: new Date(), icon: "fas fa-user-plus" },
      {
        type: "course_created",
        message: "New course published",
        timestamp: new Date(Date.now() - 3600000),
        icon: "fas fa-book",
      },
      {
        type: "payment",
        message: "Payment received",
        timestamp: new Date(Date.now() - 7200000),
        icon: "fas fa-credit-card",
      },
    ]
  }

  manageUsers(): void {
    this.router.navigate(["/users"])
  }

  manageCourses(): void {
    this.router.navigate(["/courses"])
  }

  viewReport(): void {
    console.log("[v0] Opening analytics report")
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/auth/login"])
  }
}
