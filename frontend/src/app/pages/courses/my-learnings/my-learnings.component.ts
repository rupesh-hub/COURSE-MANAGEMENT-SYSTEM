import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { CourseService } from "../service/course.service"

interface LearningItem {
  courseId: string
  courseName: string
  instructor: string
  progress: number
  lastAccessed: Date
  totalLessons: number
  completedLessons: number
  hoursSpent: number
  category: string
}

@Component({
  selector: "cms-my-learnings",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./my-learnings.component.html",
  styleUrl: "./my-learnings.component.scss",
})
export class MyLearningsComponent implements OnInit {
  learnings: LearningItem[] = []
  filteredLearnings: LearningItem[] = []
  searchQuery = ""
  filterCategory = "all"
  sortBy = "recent"

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadLearnings()
  }

  loadLearnings(): void {
    this.courseService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.learnings = courses.map((course, index) => ({
          courseId: course.id,
          courseName: course.title,
          instructor: `${course.instructor.firstname} ${course.instructor.lastname}`,
          progress: Math.floor(Math.random() * 100),
          lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          totalLessons: Math.floor(Math.random() * 50) + 20,
          completedLessons: Math.floor(Math.random() * 40),
          hoursSpent: Math.random() * 30,
          category: course.category,
        }))
        this.applyFilters()
      },
      error: () => {
        this.learnings = this.getDemoLearnings()
        this.applyFilters()
      },
    })
  }

  private getDemoLearnings(): LearningItem[] {
    return [
      {
        courseId: "1",
        courseName: "The Complete JavaScript Course 2024",
        instructor: "Jonas Schmedtmann",
        progress: 75,
        lastAccessed: new Date(),
        totalLessons: 45,
        completedLessons: 34,
        hoursSpent: 24.5,
        category: "Web Development",
      },
      {
        courseId: "3",
        courseName: "React - The Complete Guide",
        instructor: "Maximilian Schwarzmüller",
        progress: 60,
        lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        totalLessons: 38,
        completedLessons: 23,
        hoursSpent: 18.3,
        category: "Web Development",
      },
    ]
  }

  onSearch(): void {
    this.applyFilters()
  }

  onFilterChange(): void {
    this.applyFilters()
  }

  private applyFilters(): void {
    let filtered = this.learnings

    if (this.searchQuery) {
      filtered = filtered.filter((item) => item.courseName.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }

    if (this.filterCategory !== "all") {
      filtered = filtered.filter((item) => item.category === this.filterCategory)
    }

    if (this.sortBy === "recent") {
      filtered.sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime())
    } else if (this.sortBy === "progress") {
      filtered.sort((a, b) => b.progress - a.progress)
    }

    this.filteredLearnings = filtered
  }

  formatDate(date: Date): string {
    const today = new Date()
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

    if (date.toDateString() === today.toDateString()) return "Today"
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday"

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    if (progress >= 20) return "bg-yellow-500"
    return "bg-red-500"
  }
}
