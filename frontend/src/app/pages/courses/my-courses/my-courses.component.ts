import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { Course } from "../model/course.model"
import { CourseService } from "../service/course.service"

@Component({
  selector: "cms-my-courses",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./my-courses.component.html",
  styleUrl: "./my-courses.component.scss",
})
export class MyCoursesComponent implements OnInit {
  courses: Course[] = []
  filteredCourses: Course[] = []
  searchQuery = ""
  sortBy = "recent"
  filterLevel = "all"
  isLoading = false
  Math = Math

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses()
  }

  loadCourses(): void {
    this.isLoading = true
    this.courseService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.courses = courses.length > 0 ? courses : this.getEnrolledCoursesDemo()
        this.filteredCourses = this.courses
        this.isLoading = false
      },
      error: () => {
        this.courses = this.getEnrolledCoursesDemo()
        this.filteredCourses = this.courses
        this.isLoading = false
      },
    })
  }

  private getEnrolledCoursesDemo(): Course[] {
    return [
      {
        id: "1",
        title: "The Complete JavaScript Course 2024",
        description: "Master JavaScript from basics to advanced",
        thumbnail: "/placeholder.svg?key=angular-course",
        price: 14.99,
        originalPrice: 79.99,
        rating: 4.8,
        reviews: 1250000,
        students: 3000000,
        duration: 69,
        totalDuration: 4140,
        level: "Beginner",
        category: "Web Development",
        language: "English",
        isBestseller: true,
        isPublished: true,
        createdOn: "2024-01-15",
        instructor: {
          id: 1,
          username: "jonas",
          email: "jonas@example.com",
          firstname: "Jonas",
          lastname: "Schmedtmann",
          phone: "+1234567890",
          bio: "Expert instructor",
          isActive: true,
        },
        lessons: [],
      },
      {
        id: "3",
        title: "React - The Complete Guide",
        description: "Master React from basics to advanced",
        thumbnail: "/placeholder.svg?key=typescript-course",
        price: 14.99,
        originalPrice: 84.99,
        rating: 4.9,
        reviews: 2100000,
        students: 4500000,
        duration: 49,
        totalDuration: 2940,
        level: "Intermediate",
        category: "Web Development",
        language: "English",
        isBestseller: true,
        isPublished: true,
        createdOn: "2024-04-05",
        instructor: {
          id: 2,
          username: "maximilian",
          email: "max@example.com",
          firstname: "Maximilian",
          lastname: "Schwarzmüller",
          phone: "+1234567891",
          bio: "React expert",
          isActive: true,
        },
        lessons: [],
      },
    ]
  }

  onSearch(): void {
    this.applyFilters()
  }

  onFilterChange(): void {
    this.applyFilters()
  }

  onSortChange(): void {
    this.applyFilters()
  }

  private applyFilters(): void {
    let filtered = this.courses

    if (this.searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    }

    if (this.filterLevel !== "all") {
      filtered = filtered.filter((course) => course.level === this.filterLevel)
    }

    if (this.sortBy === "recent") {
      filtered.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
    } else if (this.sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    } else if (this.sortBy === "students") {
      filtered.sort((a, b) => b.students - a.students)
    }

    this.filteredCourses = filtered
  }

  getProgressPercentage(courseId: any): number {
    return Math.floor(Math.random() * 100)
  }
}
