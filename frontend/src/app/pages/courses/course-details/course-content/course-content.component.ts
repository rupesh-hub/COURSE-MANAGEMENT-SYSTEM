import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../model/course.model';

@Component({
  selector: 'cms-course-content',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.scss',
})
export class CourseContentComponent {
  @Input() course!: Course;

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
}
