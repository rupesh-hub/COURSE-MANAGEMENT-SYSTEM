import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import type { Course } from "../model/course.model"
import { CourseService } from "../service/course.service"

@Component({
  selector: "cms-course-list",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./course-list.component.html",
  styleUrl: "./course-list.component.scss",
})
export class CourseListComponent implements OnInit {
  courses: Course[] = []
  filteredCourses: Course[] = []
  recommendedCourses: Course[] = []
  enrolledCourses: Course[] = []
  recentActivities: any[] = []
  searchQuery = ""
  selectedCategory = ""
  selectedLevel = ""
  selectedLanguage = ""
  sortBy = "popularity"
  streakDays: number = 4
  stats: any = {}
  userProfile: any = {}

  categories = ["All", "Web Development", "Data Science", "Design", "Mobile Development"]
  levels = ["All", "Beginner", "Intermediate", "Advanced"]
  languages = ["All", "English", "Spanish", "French", "German"]

  private courseService: CourseService = inject(CourseService)
  private router: Router = inject(Router)

  ngOnInit(): void {
    // Load all courses
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses
      this.applyFilters()
      this.updateStats()
    })

    // Load recommended courses
    this.courseService.getRecommendedCourses().subscribe((courses) => {
      this.recommendedCourses = courses
    })

    // Load enrolled courses
    this.courseService.getEnrolledCourses().subscribe((courses) => {
      this.enrolledCourses = courses
      // Recent activities based on enrolled courses
      this.recentActivities = courses.map((c) => ({
        course: c.title,
        activity: "Enrolled in course",
        time: "Recently",
      }))
    })

    // Dummy user profile
    this.userProfile = {
      name: "Jane Doe",
      avatar: "https://source.unsplash.com/100x100/?portrait",
      streakDays: this.streakDays,
    }
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesSearch =
        !this.searchQuery ||
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.instructor.firstname.toLowerCase().includes(this.searchQuery.toLowerCase())

      const matchesCategory =
        !this.selectedCategory || this.selectedCategory === "All" || course.category === this.selectedCategory

      const matchesLevel = !this.selectedLevel || this.selectedLevel === "All" || course.level === this.selectedLevel

      const matchesLanguage =
        !this.selectedLanguage || this.selectedLanguage === "All" || course.language === this.selectedLanguage

      return matchesSearch && matchesCategory && matchesLevel && matchesLanguage
    })

    this.sortCourses()
  }

  sortCourses(): void {
    if (this.sortBy === "price-low") {
      this.filteredCourses.sort((a, b) => a.price - b.price)
    } else if (this.sortBy === "price-high") {
      this.filteredCourses.sort((a, b) => b.price - a.price)
    } else if (this.sortBy === "rating") {
      this.filteredCourses.sort((a, b) => b.rating - a.rating)
    } else {
      this.filteredCourses.sort((a, b) => b.students - a.students)
    }
  }

  onSearchChange(): void {
    this.applyFilters()
  }

  onFilterChange(): void {
    this.applyFilters()
  }

  onSortChange(): void {
    this.sortCourses()
  }

  toggleWishlist(course: Course): void {
    this.courseService.toggleWishlist(course.id)
  }

  enrollCourse(course: Course): void {
    this.courseService.enrollCourse(course.id).subscribe((response) => {
      if (response.success) {
        console.log("Enrolled in:", course.title)
        this.router.navigate([`/courses/${course.id}`])
        this.enrolledCourses.push(course) // update local enrolled courses
      } else {
        console.warn(response.message)
      }
    })
  }

  viewCourseDetails(courseId: string): void {
    this.router.navigate([`/courses/${courseId}`])
  }

  getStudentCount(count: number): string {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M"
    if (count >= 1000) return (count / 1000).toFixed(0) + "K"
    return count.toString()
  }

  exploreCourse(course: Course) {
    console.log("Explore course:", course.title)
  }

  continueLearning(course: Course) {
    console.log("Continue learning:", course.title)
  }

  viewAllCourses() {
    console.log("View all courses")
  }

  getTimeAgo(time: string) {
    return time // placeholder
  }

  private updateStats() {
    this.stats = {
      totalCourses: this.courses.length,
      totalStudents: this.courses.reduce((sum, c) => sum + c.students, 0),
      totalRevenue: this.courses.reduce((sum, c) => sum + c.price * c.students, 0),
    }
  }
}
