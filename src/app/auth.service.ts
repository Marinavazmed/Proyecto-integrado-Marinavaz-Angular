import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoggedInUser } from "./auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

   logIn(username: any, password: any ): Observable<any> {
     return this.http.post(
       'http://127.0.0.1:8000/api-user-login/', { username, password }
       ) as Observable<any>;
   }

   setLoggedInUser(userData: LoggedInUser): void {
    if (localStorage.getItem('userData') !== JSON.stringify(userData)) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
   }
}