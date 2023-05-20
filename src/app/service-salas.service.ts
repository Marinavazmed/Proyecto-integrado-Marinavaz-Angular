import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { po } from 'src/po';
import { sala } from './sala-main/sala';
import { getURLs } from './utils';
import { FormBuilder, Validators } from '@angular/forms';
import { Tarea } from './sala-main/tarea';
import { Sala } from './crear-sala/sala';
import { sala_put_service } from './sala-main/sala-put-service';

@Injectable({
  providedIn: 'root'
})
export class ServiceSalasService {

  public idUser: any;
  public url = getURLs()

  constructor(
    private _http: HttpClient) {
  }




  getSalas(): Observable<any[]> {
    return this._http.get<any[]>(this.url);
  }

  getSalasParticipante(): Observable<any[]> {
    return this._http.get<any[]>(this.url + "api/v1/sala/get_sala_participante/");
  }

  postSala(sala: any): Observable<any> {
    const url = this.url + "api/v1/sala/"
    return this._http.post<any>(url, sala);
  }

  getSala(nombre_sala: any): Observable<any> {
    const url = this.url + `api/v1/sala/?nombre_sala=${nombre_sala}`;
    return this._http.get<any>(url)
  }

  getSalaPromise(nombre_sala: any): Observable<any> {
    const url = this.url + 'api/v1/sala/?nombre_sala=' + nombre_sala;
    return this._http.get<any>(url)
  }


  //Función que devuelve las salas por id de usuario
  getSalasPorIDUser(id: any): Observable<any[]> {
    return this._http.get<any[]>(this.url + `api/v1/profile_po/?usuario=${id}`);
  }

  //Función que devuelve las salas del po cuyo id se le pase
  getSalasPorIDPO(id: any): Observable<any[]> {
    return this._http.get<any[]>(this.url + `api/v1/sala/?nombre_sala=&prod_owner=${id}`);
  }



  //Incluye al usuario autenticado bajo el perfil de DEV en una sala.
  joinSala(values: any): void {
    //1.-selecciona la sala por nombre
    this.getSala(values.nombre_sala).subscribe(data => {
      if(data.length!=0){
        //Si existe la sala comprueba las credenciales
        if (data[0].pass_sala == values.pass_sala && data[0].nombre_sala == values.nombre_sala) {
          let url = data[0].url
          values.id = data[0].id
          values.prod_owner = data[0].prod_owner;
  
          //2.-actualiza la lista devs de la sala añadiendo al usuario actual. El dev debe ser el usuario autenticado bajo
          //un perfil Profile_DEV
          let perfilDEV = JSON.parse(sessionStorage.getItem("perfilDEV")!);
          let perfil = new po(perfilDEV.id, perfilDEV.usuario, perfilDEV.url, perfilDEV.puntuacion)
          let arraydevs = []
          arraydevs.push(perfil)
          for (let i = 0; i < data[0].devs.length; i++) {
            let dev = new po(data[0].devs[i].id, data[0].devs[i].usuario, data[0].devs[i].url, data[0].devs[i].puntuacion)
            console.log(dev)
            arraydevs.push(dev)
          }
          values.devs = arraydevs
          values.url = url;
          //petición put con nuevos valores de devs
          this._http.put<any>(url, values).subscribe()
        }
      }else{
        console.log("Las credenciales son incorrectas.")
        alert("Las credenciales son incorrectas.")
      }

    })

  }



  leaveSala(sala_put: any): void {
    let url = this.url + `api/v1/sala/${sala_put.id}/`
    this._http.put<any>(url, sala_put).subscribe()
  }




  deleteSala(nombre_sala:any):void{
    let url:any;
    this.getSala(nombre_sala).subscribe(data=>{
      console.log(data[0].id)
      url=this.url + `api/v1/sala/${data[0].id}/`
      this._http.delete(url).subscribe()
    })
  }


}
