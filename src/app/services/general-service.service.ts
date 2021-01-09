import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {

  public url:string;

  private headers:HttpHeaders;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  testService() {
    return 'Probando el servicio de peticiones.';
  }

  fetchElements(route:any): Observable<any> {
    let params = JSON.stringify(route);
    return this._http.post(this.url, params, { headers: this.headers });
  }

  renameElement(data:any): Observable<any> {
    let params = JSON.stringify(data);
    return this._http.post(this.url + 'rename', params, { headers: this.headers });
  }

  deleteElement(element:any): Observable<any> {
    let params = JSON.stringify(element);
    return this._http.post(this.url + 'delete', params, { headers: this.headers });
  }

  downloadFile(element:any): Observable<any> {
    let params = JSON.stringify(element);
    return this._http.post(this.url + 'file/download', params, { headers: this.headers });
  }

  uploadFiles(pathToUpload:string, data:any): Observable<any> {
    return this._http.post(this.url + 'file/upload/' + pathToUpload, data);
  }
}
