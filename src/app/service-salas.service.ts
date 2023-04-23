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
    console.log("GET sala con nombre " + nombre_sala)
    const url = `http://localhost:8000/api/v1/sala/?nombre_sala=${nombre_sala}`;
    return this._http.get<any>(url)
  }

  getSalaPromise(nombre_sala:any): Observable<any> {
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

  joinSala(values:any): void{
    //1.-selecciona la sala por nombre
    this.getSala(values.nombre_sala).subscribe(data=>{
          //2.-Comprueba nombre-contraseña
      if(data[0].pass_sala  == values.pass_sala){
        let url = data[0].url
        values.id=data[0].id
        values.prod_owner=data[0].prod_owner;
          //3.-actualiza la lista devs de la sala añadiendo al usuario actual
        values.devs=data[0].devs;
        values.url=url;
        values.pass_sala = "marina2";
        this._http.put<any>(url, values).subscribe()
      }else{
        console.log("Esa sala no existe")
      }
    })


  }


 /*
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
  */

  
}
