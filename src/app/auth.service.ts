import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoggedInUser } from "./auth";
import { ActivatedRoute, Route, Router } from '@angular/router';
import { getURLs } from './utils';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn=false;
  url = getURLs()
  constructor(private http: HttpClient, private router: Router) {
    this.isLoggedIn = false;
  }

  logIn(username: any, password: any): Observable<any> {
    this.isLoggedIn = true;
    return this.http.post(
      this.url + 'api-user-login/', { username, password }
    ) as Observable<any>;
  }

  /*actualiza userData y la variable isLoggedIn que va a ser usada para comprobar el estado del usuario (barra de navegacion)TODO*/
  setLoggedInUser(userData: LoggedInUser): void {
    if (localStorage.getItem('userData') !== JSON.stringify(userData)) {
      localStorage.setItem('userData', JSON.stringify(userData));
      this.isLoggedIn = true;
    }
  }
  /*peticion + actualizacion de variable isLoggedIn + redireccion a pagina de perfil*/
  public logInUser(user: any): void {
    this.isLoggedIn = true;
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

  /*TODO: Eliminar tambien resto de storage. Revisar la necesidad de almacenamiento: profile no se usa y resulta muy util para ahorrar codigo*/
  public logOut() {
    localStorage.removeItem('profile');
    localStorage.removeItem('userData');
    this.isLoggedIn = false;
  }
}