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
      console.log(data[0].pass_sala)
      console.log(typeof(data[0].devs))
          //2.-Comprueba nombre-contraseña
      if(data[0].pass_sala  == values.pass_sala){
        values.id=data.id
        values.prod_owner=data.prod_owner;
          //3.-actualiza la lista devs de la sala
        values.devs=data[0].devs.push(values.devs);
        values.url=data.url;
        this._http.put(`http://localhost:8000/api/v1/sala/?nombre_sala=${data.nombre_sala}`, values)
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
