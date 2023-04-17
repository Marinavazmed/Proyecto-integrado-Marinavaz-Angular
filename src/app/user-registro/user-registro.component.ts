import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UserProfileService } from '../user-profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-registro',
  templateUrl: './user-registro.component.html',
  styles: [
  ]
})

export class UserRegistroComponent implements OnInit{
  registroForm;
  infoMessage = "";
  errors = [];
  constructor(private formBuilder: FormBuilder, private UserProfileService: UserProfileService, public router: Router, private authService: AuthService) {
    this.registroForm = this.formBuilder.group({
      username: ['' as string | null, Validators.required],
      password:  ['' as string | null, Validators.required],
      first_name:  ['' as string | null, Validators.required],
      last_name:  ['' as string | null, Validators.required],
      email:  ['' as string | null, Validators.required],
      created_at: new Date(),
    });
   }

  ngOnInit(): void {
  }


 onSubmit() {
    console.log(this.registroForm.value)
    if (this.registroForm.invalid) {
      console.log(this.registroForm.errors);
      this.infoMessage = "Formulario no válido"
    } else {
      this.UserProfileService.postUser(this.registroForm.value).subscribe(x => {
        console.log('Persona registrada', x)
      },
        err => {
          if(err instanceof HttpErrorResponse){
            const ValidationErrors = err.error;
            Object.keys(ValidationErrors).forEach(prop=>{
              const formControl = this.registroForm.get(prop);
              if(formControl){
                formControl.setErrors({
                  serverError: ValidationErrors[prop]
                })
              }
            })
          }
          this.errors = err.error.message;
          console.log(this.errors);
        }
      );
    }


  }


 /* onSubmit() {
    console.log(this.registroForm.value)
    if (this.registroForm.invalid) {
      console.log(this.registroForm.errors);
      this.infoMessage = "Formulario no válido"
    } else {
      this.UserProfileService.postUser(this.registroForm.value).subscribe();
    }


  }*/


    /*onSubmit() {
    console.log(this.registroForm.value)
    if (this.registroForm.invalid) {
      console.log(this.registroForm.errors);
      this.infoMessage = "Formulario no válido"
    } else {
      this.UserProfileService.postUser(this.registroForm.value).subscribe(x => {
        console.log('Successfully saved person', x);
      }, err => {
        if (err instanceof HttpErrorResponse) {
          const errorMessages = new Array<{ propName: string; errors: string }>();
    
          if(err.status === 422 || err.status===400) {
            Object.keys(errorMessages).forEach(prop => {
              const formControl = this.registroForm.get(prop);
              if (formControl) {
                formControl.setErrors({
                  serverError: errorMessages[1]
                });
              }
            });
          }
        }
      });
    }


  }*/

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);

  }

}
