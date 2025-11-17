import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _http: HttpClient = inject(HttpClient);

  public message = (): Observable<any> => {
    return this._http.get<any>(
      `http://192.168.1.70:8181/message`
    )
  }

}
