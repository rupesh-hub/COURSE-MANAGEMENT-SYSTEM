import { Component,  OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import  { ActivatedRoute } from "@angular/router"
import  { Comment, Course } from "../model/course.model"
import  { CourseService } from "../service/course.service"
import { CourseSidebarComponent } from "./course-sidebar/course-sidebar.component"
import { CourseHeaderComponent } from "./course-header/course-header.component"
import { CommentListComponent } from "../comments/comment-list/comment-list.component"
import { CourseContentComponent } from "./course-content/course-content.component"

@Component({
  selector: "cms-course-details",
  imports: [CommonModule, CourseSidebarComponent, CourseHeaderComponent, CourseContentComponent, CommentListComponent],
  standalone: true,
  templateUrl: "./course-details.component.html",
  styleUrl: "./course-details.component.scss",
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null
  comments: Comment[] = []
  courseId = "1"
  isLoading = true

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.courseId = params["id"] || "1"
      this.loadCourseData()
    })
  }

  private loadCourseData(): void {
    this.isLoading = true
    this.courseService.getCourseDetail(this.courseId).subscribe({
      next: (course: any) => {
        this.course = course
        this.isLoading = false
      },
      error: (err) => {
        console.error("Error loading course:", err)
        this.isLoading = false
      },
    })

    this.courseService.getCourseComments(this.courseId).subscribe({
      next: (comments: Comment[]) => {
        this.comments = comments
      },
      error: (err) => console.error("Error loading comments:", err),
    })
  }
}
