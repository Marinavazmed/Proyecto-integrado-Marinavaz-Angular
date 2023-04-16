import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "src/app/user-login/usuario";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile(userId: string|null): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/v1/user/${userId}/`);
  }

  postUser(usuario:any): Observable<any> {
    const url = 'http://127.0.0.1:8000/registro/'
    return this.http.post<any>(url,usuario);
  }
}