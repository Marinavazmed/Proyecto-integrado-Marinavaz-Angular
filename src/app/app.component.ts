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
  }

  goToSalas():void{
    this.checkUser=localStorage.getItem("userData");
    this.urlSalas = "/user-profile/"+ JSON.parse(this.checkUser)?.id;
    this.router.navigate([`${this.urlSalas}`]);
  }
}