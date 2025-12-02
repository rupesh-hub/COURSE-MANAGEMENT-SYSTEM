import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Course} from '../../model/course.model';

@Component({
  selector: 'cms-course-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './course-header.component.html',
  styleUrl: './course-header.component.scss'
})
export class CourseHeaderComponent {

  @Input() course!: Course

}
