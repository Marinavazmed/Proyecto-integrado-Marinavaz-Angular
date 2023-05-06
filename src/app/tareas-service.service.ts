import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from './sala-main/tarea';
import { getURLs } from './utils';

@Injectable({
  providedIn: 'root'
})
export class TareasServiceService {
  public url = getURLs()
  public idUser:any;

  constructor(
    private _http: HttpClient
  ) {
   }

  getTareas(): Observable<any[]>{
		return this._http.get<any[]>(this.url);
	}

  postTarea(tarea:any): Observable<any> {
    const url = this.url + 'api/v1/tarea/'
    return this._http.post<any>(url,tarea);
  }

  getTareasPorNombreSala(nombre_sala:any): Observable<any> {
    const url = this.url + 'api/v1/tarea/?id_sala__nombre_sala='+ nombre_sala;
    return this._http.get<any>(url)
  }

  deleteTarea(id_tarea: any):Observable<any> {
    return this._http.delete(this.url + `api/v1/tarea/${id_tarea}/`)
  }

  putTarea(tarea:any):void{
    let tarea_put = new Tarea(tarea.id, tarea.id_sala, tarea.dev_asignado, tarea.nombre_tarea, tarea.desc_tarea, tarea.estado_tarea, tarea.tiempo_estimado, tarea.puntos, tarea.url)
    this._http.put<any>(tarea.url, tarea_put).subscribe()
  }

  putTareaObservable(tarea:any):Observable<any>{
    let tarea_put = new Tarea(tarea.id, tarea.id_sala, tarea.dev_asignado, tarea.nombre_tarea, tarea.desc_tarea, tarea.estado_tarea, tarea.tiempo_estimado, tarea.puntos, tarea.url)
    return this._http.put<any>(tarea.url, tarea_put)
  }

  getTarea(id_tarea: any):Observable<any> {
    return this._http.get(this.url + `api/v1/tarea/${id_tarea}/`)
  }

}
