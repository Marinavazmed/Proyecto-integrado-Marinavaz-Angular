import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from './sala-main/tarea';
import { getURLs } from './utils';

@Injectable({
  providedIn: 'root'
})
export class TareaServiceService {
  public url=getURLs()
  constructor(private http: HttpClient) {
   }

  getUserProfile(userId: string|null): Observable<any> {
    return this.http.get(this.url + `api/v1/user/${userId}/`);
  }


  getUserProfileByName(username: any): Observable<any> {
    return this.http.get(this.url + `api/v1/user/?username=${username}/`);
  }

  postUser(usuario:any): Observable<any> {
    const url = this.url + 'registro/'
    return this.http.post<any>(url,usuario);
  }
}
