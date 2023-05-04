import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnChanges, OnInit{
  title = 'PI';
  checkUser:any;
  urlSalas: any;
  constructor(public loginService: AuthService,public router: Router){
    this.checkUser=localStorage.getItem("userData");
    this.urlSalas = "/user-profile/"+ JSON.parse(this.checkUser)?.id;
  }


  ngOnInit(): void {
    this.checkUser=localStorage.getItem("userData");
    console.log(this.checkUser)
  }


  ngOnChanges(): void {
    this.checkUser=localStorage.getItem("userData");
  }

  
  logOut(){
    this.loginService.logOut()
    sessionStorage.setItem("perfilDEV", JSON.stringify(""));
    this.router.navigate([`/index`]);
  }

  goToProfile():void{
    //en un futuro, cambiar por vista diferenciada de perfil
    /*this.checkUser=localStorage.getItem("userData");
    if(this.checkUser){
      this.urlSalas = "/user-profile/"+ JSON.parse(this.checkUser)?.id;
      this.router.navigate([`${this.urlSalas}`]);
    }else{
      this.router.navigate([`/index`]);
    }*/
    this.router.navigate([`/index`]);

  }
  goToSalas():void{
    this.checkUser=localStorage.getItem("userData");
    if(this.checkUser){
      this.urlSalas = "/user-profile/"+ JSON.parse(this.checkUser)?.id;
      this.router.navigate([`${this.urlSalas}`]);
    }else{
      this.router.navigate([`/login`]);
    }

  }
}