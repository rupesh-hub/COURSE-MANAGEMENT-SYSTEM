import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Comment } from '../../model/course.model';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'cms-comment-list',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];
  @Input() courseId = '1';

  newComment = {
    rating: 0,
    text: '',
    author: 'You',
    avatar: 'https://via.placeholder.com/48?text=YOU',
  };

  constructor(private courseService: CourseService) {}

  getRatingPercentage(rating: number): number {
    const ratingCounts: { [key: number]: number } = {
      5: 65,
      4: 20,
      3: 10,
      2: 3,
      1: 2,
    };
    return ratingCounts[rating] || 0;
  }

  getRatingCount(rating: number): number {
    return this.getRatingPercentage(rating);
  }

  submitComment() {
    if (this.newComment.text.trim() && this.newComment.rating > 0) {
      const comment: Omit<Comment, 'id'> = {
        author: this.newComment.author,
        avatar: this.newComment.avatar,
        rating: this.newComment.rating,
        text: this.newComment.text,
        date: 'just now',
        helpful: 0,
      };

      this.courseService
        .addComment(this.courseId, comment)
        .subscribe((result) => {
          this.comments.unshift(result);
          this.newComment = {
            rating: 0,
            text: '',
            author: 'You',
            avatar: 'https://via.placeholder.com/48?text=YOU',
          };
        });
    }
  }
}
