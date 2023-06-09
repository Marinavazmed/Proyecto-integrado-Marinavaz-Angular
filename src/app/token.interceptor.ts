import { Injectable } from '@angular/core';
import {
 HttpRequest,
 HttpHandler,
 HttpEvent,
 HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/*Intercepta las peticiones y mete en los headers el token de autentificacion para que yo no tenga que meterlo cada vez que hago una peticion*/
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

 constructor() {}

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const userData = JSON.parse(localStorage.getItem('userData') || '{}');
   if (userData.token) {
     request = request.clone({
       setHeaders: {
           Authorization: `Token ${userData.token}`
       }
     });
   }
   return next.handle(request);
 }
}