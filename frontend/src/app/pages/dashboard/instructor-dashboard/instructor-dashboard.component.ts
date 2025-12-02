import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"
import { AuthService } from "../../../core/auth/auth.service"

interface InstructorStats {
  title: string
  value: string | number
  icon: string
  color: string
}

@Component({
  selector: "cms-instructor-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./instructor-dashboard.component.html",
  styleUrl: "./instructor-dashboard.component.scss",
})
export class InstructorDashboardComponent implements OnInit {
  stats: InstructorStats[] = []
  myCourses: any[] = []
  students: any[] = []
  earnings: any[] = []

  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router)

  ngOnInit(): void {
    this.initializeStats()
    this.loadMyCourses()
    this.loadStudents()
    this.loadEarnings()
  }

  private initializeStats(): void {
    this.stats = [
      {
        title: "Total Courses",
        value: 8,
        icon: "fas fa-book",
        color: "bg-sage-light",
      },
      {
        title: "Total Students",
        value: 2450,
        icon: "fas fa-users",
        color: "bg-blue-100",
      },
      {
        title: "Total Earnings",
        value: "$12,450",
        icon: "fas fa-dollar-sign",
        color: "bg-green-100",
      },
      {
        title: "Rating",
        value: "4.8/5",
        icon: "fas fa-star",
        color: "bg-amber-100",
      },
    ]
  }

  private loadMyCourses(): void {
    this.myCourses = [
      { id: 1, title: "Advanced Angular", students: 890, rating: 4.8, earnings: 5420 },
      { id: 2, title: "React Masterclass", students: 1250, rating: 4.9, earnings: 7030 },
      { id: 3, title: "TypeScript Pro", students: 456, rating: 4.7, earnings: 2340 },
    ]
  }

  private loadStudents(): void {
    this.students = [
      { id: 1, name: "Alice Johnson", enrolledCourses: 2, progress: 75 },
      { id: 2, name: "Bob Smith", enrolledCourses: 1, progress: 45 },
      { id: 3, name: "Charlie Brown", enrolledCourses: 3, progress: 90 },
    ]
  }

  private loadEarnings(): void {
    this.earnings = [
      { month: "January", amount: 2150, courses: 3 },
      { month: "February", amount: 3240, courses: 5 },
      { month: "March", amount: 4060, courses: 6 },
    ]
  }

  createCourse(): void {
    this.router.navigate(["/courses/create"])
  }

  editCourse(courseId: number): void {
    this.router.navigate([`/courses/${courseId}/edit`])
  }

  viewStudents(): void {
    this.router.navigate(["/users"])
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/auth/login"])
  }
}
