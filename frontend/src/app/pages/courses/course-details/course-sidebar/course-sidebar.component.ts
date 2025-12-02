import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import {Course} from '../../model/course.model';

@Component({
  selector: 'cms-course-sidebar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './course-sidebar.component.html',
  styleUrl: './course-sidebar.component.scss'
})
export class CourseSidebarComponent {

  @Input() course!: Course

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

}
