import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UserProfileService } from '../user-profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator, FormControl } from '@angular/forms';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

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
  checked:any;
  faCheck = faCheck;
  faError = faXmark;
  selectedFile:any;
  constructor(private formBuilder: FormBuilder, private UserProfileService: UserProfileService, public router: Router, private authService: AuthService) {
    this.registroForm = this.formBuilder.group({
      username: ['' as string | null, Validators.required],
      password:  ['' as string | null, Validators.required],
      first_name:  ['' as string | null, Validators.required],
      last_name:  ['' as string | null, Validators.required],
      //TODO: Add imagenes de perfil al formulario de registro
      //profile_pic: [File, Validators.required],
      email:  ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      created_at: new Date(),
    });
   }

  ngOnInit(): void {

  }

  //Comprueban que las password encajen en tiempo real. 
  //TODO: No es una validacion ya que no es un requisito que encajen para mandar peticion
  checkPass(pass: any, $event:any){
    if(pass!=$event?.target?.value){
      console.log("No encajan")
      this.checked=false;
    }else{
      console.log("encajan")
      this.checked=true;
    }
  }


  //Manda peticion post + Recoge errores de validacion de servidor si los hay.
 onSubmit() {
    if (this.registroForm.invalid) {
      console.log(this.registroForm.errors);
      this.infoMessage = "Formulario no válido"
    } else {
      this.UserProfileService.postUser(this.registroForm.value).subscribe(x => {
        console.log('Persona registrada', x)
        this.authService.logInUser(this.registroForm.value)
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
        }
      );
    }


  }



  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}
