import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaServiceService {
  url: string;
  constructor(private http: HttpClient) {
    this.url="http://localhost:8000/api/v1/tarea/"
   }

  getUserProfile(userId: string|null): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/user/${userId}/`);
  }


  getUserProfileByName(username: any): Observable<any> {
    return this.http.get(`http://localhost:8000/api/v1/user/?username=${username}/`);
  }

  postUser(usuario:any): Observable<any> {
    const url = 'http://127.0.0.1:8000/registro/'
    return this.http.post<any>(url,usuario);
  }
}
