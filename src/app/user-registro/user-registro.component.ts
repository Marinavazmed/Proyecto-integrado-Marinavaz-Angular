import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UserProfileService } from '../user-profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator, FormControl } from '@angular/forms';
import { faCheck, faXmark, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-registro',
  templateUrl: './user-registro.component.html',
  styles: [
  ]
})

export class UserRegistroComponent implements OnInit {
  registroForm;
  infoMessage = "";
  errors = [];
  checked: any;
  faCheck = faCheck;
  faError = faXmark;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  selectedFile: any;
  pass_valid: any;
  file: string = "";
  confirmacion = "";
  fieldTextType = false;

  constructor(private formBuilder: FormBuilder, private UserProfileService: UserProfileService, public router: Router, private authService: AuthService) {
    this.registroForm = this.formBuilder.group({
      username: ['' as string | null, Validators.compose([
        Validators.required,
        Validators.pattern('^[ _0-9a-zA-Z./w]{1,50}$')
      ])],
      password: ['' as string | null, Validators.compose([
        Validators.required,
        Validators.pattern('^[ _0-9a-zA-Z./w]{8,}$')
      ])],
      first_name: ['' as string | null, Validators.compose([
        Validators.required,
        Validators.pattern('^[ _0-9a-zA-Z./w]{1,50}$')
      ])],
      last_name: ['' as string | null, Validators.compose([
        Validators.required,
        Validators.pattern('^[ _0-9a-zA-Z./w]{1,50}$')
      ])],
      email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      created_at: new Date(),
    });
  }

  ngOnInit(): void {

  }

  toggleFieldTextType($event:any) {
    this.fieldTextType = !this.fieldTextType;
  }

  //Comprobaciones a tiempo real de contraseña
  checkValid(pass: any){
    if (pass.length < 8) {
      this.pass_valid = false;
    } else {
      this.pass_valid = true;
    }
  }

  checkPasswordConfirmacion(pass:any, $event:any){
    this.confirmacion= $event?.target?.value;
    if (pass != this.confirmacion) {
      console.log("No encajan")
      this.checked = false;
    } else {
      console.log("encajan")
      this.checked = true;
    }
  }

  
  checkPassword(pass:any){
    if (pass != this.confirmacion) {
      console.log("No encajan")
      this.checked = false;
    } else {
      console.log("encajan")
      this.checked = true;
    }
  }

  setConfirmacionValue($event:any){
    this.confirmacion = $event.target.value
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
          if (err instanceof HttpErrorResponse) {
            const ValidationErrors = err.error;
            Object.keys(ValidationErrors).forEach(prop => {
              const formControl = this.registroForm.get(prop);
              if (formControl) {
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

  onFileChange(event:any){}

  /*onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      this.resetInput();
    }

  }

  resetInput() {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }*/


  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

}
