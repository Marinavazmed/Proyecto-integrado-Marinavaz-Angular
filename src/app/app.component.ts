import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnChanges{
  title = 'PI';
  checkUser:any;
  constructor(public loginService: AuthService){

  }

  ngOnChanges(): void {
    this.checkUser=localStorage.getItem("userData");
  }

  
  logOut(){
    this.loginService.logOut()
  }
}