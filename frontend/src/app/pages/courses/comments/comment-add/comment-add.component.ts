import { Component, Input, Output, EventEmitter } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { Comment } from "../../model/course.model"

@Component({
  selector: "cms-comment-add",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./comment-add.component.html",
  styleUrl: "./comment-add.component.scss",
})
export class CommentAddComponent {
  @Input() courseId = "1"
  @Output() commentAdded = new EventEmitter<Omit<Comment, "id">>()

  rating = 0
  reviewText = ""
  isSubmitting = false

  submitReview(): void {
    if (this.rating > 0 && this.reviewText.trim()) {
      this.isSubmitting = true

      const newComment: Omit<Comment, "id"> = {
        author: "You",
        avatar: "https://via.placeholder.com/48?text=YOU",
        rating: this.rating,
        text: this.reviewText,
        date: "just now",
        helpful: 0,
      }

      this.commentAdded.emit(newComment)

      // Reset form
      setTimeout(() => {
        this.rating = 0
        this.reviewText = ""
        this.isSubmitting = false
      }, 500)
    }
  }

  setRating(value: number): void {
    this.rating = value
  }

  isFormValid(): boolean {
    return this.rating > 0 && this.reviewText.trim().length > 0
  }
}
