import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UserCredentials } from "../auth";
import { Router } from "@angular/router";
import { ElementRef, ViewChild } from '@angular/core';

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


  logInUser(user: UserCredentials): void {
    this.authService.logIn(user.username, user.password).subscribe({
      next: (data) => {
        this.authService.setLoggedInUser(data);
        this.router.navigateByUrl(`/user-profile/${data.id}`);

      },
      error: (error) => {
        console.log(error);
        this.infoMessage = "Credenciales incorrectas."
        if(this.infoMessage!=""){
          document.getElementById("openModalButton")?.click()
        }
        this.logInForm.reset();
      }
    }
    );

  }


  onSubmit(formData: any): void {
    console.log("SUBMIT")
    if (this.logInForm.invalid) {
      console.log(this.logInForm.errors);
    } else {
      this.logInUser(formData);
    }

  }
}