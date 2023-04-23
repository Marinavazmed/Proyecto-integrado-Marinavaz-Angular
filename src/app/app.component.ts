import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit{
  title = 'PI';
  checkUser:any;

  ngOnInit(): void {
    this.checkUser=localStorage.getItem("userData");
  }

  
  logOut(){
    localStorage.removeItem('profile');
    localStorage.removeItem('userData');
  }
}