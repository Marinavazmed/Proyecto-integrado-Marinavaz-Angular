import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserProfileService } from "../user-profile.service";
import { UserProfile } from "../user-profile";
import { ServiceSalasService } from '../service-salas.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { getURLs } from '../utils';
import { sala } from '../sala-main/sala';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [],
  providers: [ServiceSalasService, UserProfileService]
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile|null = null;
  userId :any;
  public salas:Array<any>
  public salas_PO:Array<any>
  public url_user_PO: any;

  constructor(private userProfileService: UserProfileService, private activatedRoute: ActivatedRoute, private http:HttpClient, private _peticion: ServiceSalasService, public router: Router, public loginService: AuthService) { 
    this.salas = []
    this.salas_PO = []
    this.userId = this.userProfileService.obtenerCredenciales().id
  }

  /*Guarda en el local el perfil*/
  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userProfileService.getUserProfile(userId).subscribe({
        next: (data) => {
          this.userProfile = data;
          localStorage.setItem("profile", data);
        },
        error: (error) => {
          console.log(error);
        },
        complete: ()=> this.filtraSalas()
      }
    );
    this._peticion.getSalasParticipante().subscribe(dataSalas=>{    
      this.salas = dataSalas;
    })

  }

  filtraSalas():void{
    this.userProfileService.getPOPorUserAuth().subscribe({
      next: (data)=>{
        this.url_user_PO = data.url;
        this.salas_PO=this.salas.filter((sala)=>sala.prod_owner==this.url_user_PO)
        this.salas=this.salas.filter((sala)=>sala.prod_owner!=this.url_user_PO)
        //Puede sacar id para mejor busqueda
      }
    })
  }
  
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }


  joinSala(){
    this.router.navigate(['join-sala'])
  }


  logOut(){
    this.loginService.logOut()
    this.router.navigate(['index'])
  }

  }

  