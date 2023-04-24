import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoggedInUser } from "./auth";
import { ActivatedRoute, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor(private http: HttpClient, private router: Router) { }
   logIn(username: any, password: any ): Observable<any> {
    this.isLoggedIn = true;
     return this.http.post(
       'http://127.0.0.1:8000/api-user-login/', { username, password }
       ) as Observable<any>;
   }

   setLoggedInUser(userData: LoggedInUser): void {
    if (localStorage.getItem('userData') !== JSON.stringify(userData)) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
   }

   public logInUser(user: any): void{
    this.logIn(user.username, user.password).subscribe({
        next: (data) => {
          this.setLoggedInUser(data);
          this.router.navigateByUrl(`user-profile/${data.id}`);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  public logOut(){
    this.isLoggedIn = false;
    localStorage.removeItem('profile');
    localStorage.removeItem('userData');
  }
}