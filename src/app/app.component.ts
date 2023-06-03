import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { faHome, faAddressBook, faGlobe, faMap, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getURLs } from './utils';
import { NgToastService } from 'ng-angular-popup';
import { identifierName } from '@angular/compiler';
import { isObservable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnChanges, OnInit {
  title = 'PI';
  checkUser: any;
  urlSalas: any;
  faHome = faHome;
  faGlobe = faGlobe;
  faMap = faMap;
  faEnvelope = faEnvelope;
  faAdressBook = faAddressBook;
  index = "/index";
  navbarCollapsed = true;

  constructor(public loginService: AuthService, public router: Router, private toast: NgToastService) {
    this.checkUser = localStorage.getItem("userData");
    this.urlSalas = "/user-profile/" + JSON.parse(this.checkUser)?.id;
  }


  ngOnInit(): void {
    this.checkUser = localStorage.getItem("userData");
  }

  navResponsive($event: any): void {
    document.getElementById('navTrigger')?.classList.toggle('active');
  }

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }


  ngOnChanges(): void {
    this.checkUser = localStorage.getItem("userData");
  }



  logOut() {
    this.loginService.logOut()
    sessionStorage.removeItem("perfilDEV")!
    this.router.navigate([`/index`]);
  }

  goToProfile(): void {
    //TODO: en un futuro, cambiar por vista diferenciada de perfil?
    this.router.navigate([`/index`]);

  }

  goToSalas(): void {
    this.checkUser = localStorage.getItem("userData");
    if (this.checkUser) {
      this.urlSalas = "/user-profile/" + JSON.parse(this.checkUser)?.id;
      this.router.navigate([`${this.urlSalas}`]);
    } else {
      this.router.navigate([`/login`]);
    }

  }

  goToSubscripcion(): void {
    this.checkUser = localStorage.getItem("userData");
    if (this.checkUser) {
      this.router.navigate(['/pago']);
    } else {
      this.toast.warning({ detail: 'Autenticación requerida', summary: 'Logeate para obtener tu suscripción.', duration: 3000 })
    }
  }
}