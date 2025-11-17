import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MessageService} from './services/message.service';


export interface Data {
  message: string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private _messageService: MessageService = inject(MessageService);

  data: Data;

  ngOnInit() {
    this._messageService.message()
      .subscribe(
        (data: any) => {
          console.log(data);
          this.data = data;
        },
        (error) => {
          console.log(error)
        }
      )


  }

}
