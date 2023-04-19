import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasServiceService {
  public url:string;
  public idUser:any;

  constructor(
    private _http: HttpClient
  ) {
    this.url="http://localhost:8000/api/v1/tarea/"
   }

  getTareas(): Observable<any[]>{
		return this._http.get<any[]>(this.url);
	}

  postTarea(tarea:any): Observable<any> {
    const url = 'http://localhost:8000/api/v1/tarea/'
    return this._http.post<any>(url,tarea);
  }

  getTareasPorNombreSala(nombre_sala:any): Observable<any> {
    const url = 'http://localhost:8000/api/v1/tarea/?id_sala__nombre_sala='+ nombre_sala;
    return this._http.get<any>(url)
  }

}