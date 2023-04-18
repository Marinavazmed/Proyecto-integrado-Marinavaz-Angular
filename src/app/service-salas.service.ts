import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from './crear-sala/sala';

@Injectable({
  providedIn: 'root'
})
export class ServiceSalasService {

  public url:string;
  public idUser:any;

  constructor(
    private _http: HttpClient
  ) {
    this.url="http://localhost:8000/api/v1/sala/"
   }

   getSalas(): Observable<any[]>{
		return this._http.get<any[]>(this.url);
	}

  postSala(sala:any): Observable<any> {
    const url = 'http://localhost:8000/api/v1/sala/'
    return this._http.post<any>(url,sala);
  }

  getSala(nombre_sala:any): Observable<any> {
    const url = 'http://localhost:8000/api/v1/sala/?nombre_sala='+ nombre_sala;
    return this._http.get<any>(url)
  }

  //Función que devuelve el usuario
  getSalasPorIDUser(id: any): Observable<any[]>{
    return this._http.get<any[]>(`http://localhost:8000/api/v1/profile_po/?usuario=${id}`);
  }

  //Función que devuelve idpo
  getSalasPorIDPO(id:any):Observable<any[]>{
    return this._http.get<any[]>(`http://localhost:8000/api/v1/sala/?nombre_sala=&prod_owner=${id}`);
  }

  
}
