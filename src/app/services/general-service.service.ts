import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  public url:string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  testService() {
    return 'Probando el servicio de peticiones.';
  }

  fetchElements(route:any): Observable<any> {
    let params = JSON.stringify(route);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url, params, { headers: headers });
  }
}
