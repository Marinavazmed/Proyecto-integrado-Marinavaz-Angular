import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from './crear-sala/sala';
import { keyframes } from '@angular/animations';
import { po } from 'src/po';
import { sala } from './sala-main/sala';

@Injectable({
  providedIn: 'root'
})
export class ServiceSalasService {

  public url: string;
  public idUser: any;

  constructor(
    private _http: HttpClient
  ) {
    this.url = "http://localhost:8000/api/v1/sala/"
  }

  getSalas(): Observable<any[]> {
    return this._http.get<any[]>(this.url);
  }

  getSalasParticipante(): Observable<any[]> {
    return this._http.get<any[]>("http://localhost:8000/api/v1/sala/get_sala_participante/");
  }

  postSala(sala: any): Observable<any> {
    const url = 'http://localhost:8000/api/v1/sala/'
    return this._http.post<any>(url, sala);
  }

  getSala(nombre_sala: any): Observable<any> {
    const url = `http://localhost:8000/api/v1/sala/?nombre_sala=${nombre_sala}`;
    return this._http.get<any>(url)
  }

  getSalaPromise(nombre_sala: any): Observable<any> {
    const url = 'http://localhost:8000/api/v1/sala/?nombre_sala=' + nombre_sala;
    return this._http.get<any>(url)
  }


  //Función que devuelve el usuario
  getSalasPorIDUser(id: any): Observable<any[]> {
    return this._http.get<any[]>(`http://localhost:8000/api/v1/profile_po/?usuario=${id}`);
  }

  //Función que devuelve idpo
  getSalasPorIDPO(id: any): Observable<any[]> {
    return this._http.get<any[]>(`http://localhost:8000/api/v1/sala/?nombre_sala=&prod_owner=${id}`);
  }



  //Incluye al usuario autenticado bajo el perfil de DEV en una sala.
  joinSala(values: any): void {
    //1.-selecciona la sala por nombre
    this.getSala(values.nombre_sala).subscribe(data => {

      //2.-Comprueba nombre-contraseña
      if (data[0].pass_sala == values.pass_sala) {
        let url = data[0].url
        values.id = data[0].id
        values.prod_owner = data[0].prod_owner;

        //3.-actualiza la lista devs de la sala añadiendo al usuario actual. El dev debe ser el usuario autenticado bajo
        //un perfil Profile_DEV
        let perfilDEV = JSON.parse(sessionStorage.getItem("perfilDEV")!);
        let perfil = new po(perfilDEV.id, perfilDEV.usuario, perfilDEV.url, perfilDEV.puntuacion)
        let arraydevs = []
        arraydevs.push(perfil)
        for (let i = 0; i < data[0].devs; i++) {
          let dev = new po(data[0].devs[i].id, data[0].devs[i].usuario, data[0].devs[i].url, data[0].devs[i].puntuacion)
          console.log(dev)
          arraydevs.push(dev)
        }
        values.devs = arraydevs
        values.url = url;

        //petición put con nuevos valores
        this._http.put<any>(url, values).subscribe()
      } else {
        console.log("Las credenciales para unirte a la sala son incorrectas.")
      }
    })

  }


  leaveSala(nombre_sala: any): void {
    //Selecciona la sala por nombre
    this.getSala(nombre_sala).subscribe(data => {
      let arraydevs = []
      let url = data[0].url
      let values = new sala("", "", [], "", "", "")
      values.id = data[0].id
      values.nombre_sala = data[0].nombre_sala
      values.pass_sala = data[0].pass_sala
      values.prod_owner = data[0].prod_owner;
      values.url = url;

      //Crea obj perfil con credenciales de logeo
      let perfilDEV = JSON.parse(sessionStorage.getItem("perfilDEV")!);
      let perfil = new po(perfilDEV.id, perfilDEV.usuario, perfilDEV.url, perfilDEV.puntuacion)

      //Montar arrays de datos
      for (let i = 0; i < data[0].devs; i++) {
        let dev = new po(data[0].devs[i].id, data[0].devs[i].usuario, data[0].devs[i].url, data[0].devs[i].puntuacion)
        arraydevs.push(dev)
      }
      //Filtrado del perfil del array
      arraydevs.filter(dev => dev.id != perfil.id)
      values.devs = arraydevs

      //petición put con nuevos valores
      this._http.put<any>(url, values).subscribe()
    })

  }


}
