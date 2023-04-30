import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "src/app/user-login/usuario";
import { ServiceSalasService } from './service-salas.service';
import { IfStmt } from '@angular/compiler';
import { getURLs } from './utils';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  public url = getURLs()
  constructor(private http: HttpClient, private salaService: ServiceSalasService) { }

  getUserProfile(userId: string|null): Observable<any> {
    return this.http.get(this.url + `api/v1/user/${userId}/`);
  }


  getUserProfileByName(username: any): Observable<any> {
    return this.http.get(this.url + `api/v1/user/?username=${username}/`);
  }

  postUser(usuario:any): Observable<any> {
    const url = this.url + 'registro/'
    return this.http.post<any>(url,usuario);
  }



  /*Obtiene las credenciales del usuario logado a traves de localStorage + parsea */
  public obtenerCredenciales(){
    const userData =  localStorage.getItem('userData');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        console.error('Error al analizar JSON: ', e);
        return null;
      }
    }
    return null;
  }

  getUserPorIdSala(idSala: any):Observable<any>{
    return this.http.get(this.url + `api/v1/sala/${idSala}/get_id_POUser/`);
  }


  //Peticion asincrona (para parar el resto de procesos cuando se esta ejecutando)
  //Devuelve una promesa (cuidado casteos posteriores) con el PO de la sala que se le pasa por id.
  //Sirve para comprobar si el usuario que ha entrado en la sala es o no es PO de la misma.
  async getUserPorIdSalaAsync(idSala: any):Promise<any>{
    return await this.http.get(this.url + `api/v1/sala/${idSala}/get_id_POUser/`).toPromise().then(valor => {
      return valor
    })
  }

  //Devuelve el usuario correspondiente al id del PO
  getUserPorIDPO(idPO: any):Observable<any>{
    return this.http.get(this.url + `api/v1/profile_po/${idPO}/get_id_user/`);
  }

  //Devuelve el DEV correspondiente al usuario autenticado
  getPDPorUserAuth():Observable<any>{
    return this.http.get(this.url + 'api/v1/profile_dev/get_PO_por_user_ID/');
  }

  /*Comprueba si el usuario autenticado es dueno de la sala*/
  compruebaPO(nombre_sala:any){
    let userDataId =  this.obtenerCredenciales().id;
     this.salaService.getSala(nombre_sala).subscribe(data=>{
        this.getUserPorIdSala(data[0].id).subscribe(dataUser =>{
          return this.evalIDS(dataUser, userDataId)
        })
      });
  }

  getPDEVporUserId():Observable<any>{
    return this.http.get(this.url + 'api/v1/profile_dev/get_DEV_por_user_ID/')
  }

  /*PRUEBA. Da error al crear la sala, pues la sala NO EXISTE y no puede comprobar si el usuario es PO.*/
  /*TODO: Debe ejecutarse tras la creación de sala (comprobar nulos).*/
  async compruebaPOasync(nombre_sala:any):Promise<any>{
    let userDataId =  this.obtenerCredenciales().id;
    return new Promise((resolve, reject)=>{
      this.salaService.getSala(nombre_sala).subscribe(
        async response =>{
          if(response.status != "error" && response.code !=400){
            let idSala = response[0].id
            let booleano = false;
            console.log("1) El id de la sala es: " + idSala)
            let userSala = await this.getUserPorIdSalaAsync(idSala)
            console.log("el id del usuario actual es:" + userDataId)
            console.log("El id del usuario de la sala es: " + userSala.id)
            if(userSala.id == userDataId){
              booleano=true;
            }else{
              booleano=false;
            }
            resolve(booleano)
            
          }else{
            console.log("Error en la promesa")
          }
        }, error=>{
          reject("Mensaje de error. Reject.")
        }
      )
    })


  }


  evalIDS(dataUser:any, userDataId:any){
    if(dataUser.id==userDataId){
      return true;
    }else{
      return false;
    }
  }

}