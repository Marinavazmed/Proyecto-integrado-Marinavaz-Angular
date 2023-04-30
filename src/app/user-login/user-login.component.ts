import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UserCredentials } from "../auth";
import { Router } from "@angular/router";
import { ElementRef, ViewChild } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: [
  ]
})
export class UserLoginComponent implements OnInit {
  logInForm;
  infoMessage: any = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public router: Router) {
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  ngOnInit(): void {
  }


  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }


  //Llamada al servicio y validacion en servidor del formulario de inicio de sesion.
  //Abre el modal de aviso en caso de error de validacion en servidor.
  logInUser(user: UserCredentials): void {
    this.authService.logIn(user.username, user.password).subscribe({
      next: (data) => {
        this.authService.setLoggedInUser(data);
        this.router.navigateByUrl(`/user-profile/${data.id}`);
      },
      error: (error) => {
        this.infoMessage = "Credenciales incorrectas."
        document.getElementById("openModalButton")?.click();
        this.logInForm.reset();
      }
    }

    );

  }


  //Validacion en cliente del formulario de inicio de sesion
  onSubmit(formData: any): void {
    if (this.logInForm.invalid) {
      console.log(this.logInForm.errors);
    } else {
      this.logInUser(formData);
    }

  }
}