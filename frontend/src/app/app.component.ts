import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';


export interface Data {
  message: string
}

@Component({
  selector: 'cms-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {


}
