import { Component, OnInit } from '@angular/core';
import { ServiceSalasService } from '../service-salas.service';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { UserProfileService } from '../user-profile.service';
import { Usuario } from '../user-login/usuario';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-crear-sala',
  templateUrl: './crear-sala.component.html',
  styles: [
  ]
})
export class CrearSalaComponent implements OnInit {
  crearSalaForm;
  premium = false;
  userData: any;
  varPrueba: any = {}
  numSalasUser: any = {}
  mensajeError = "";

  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router, private userService: UserProfileService) {
    this.crearSalaForm = this.formBuilder.group({
      devs: [this.formBuilder.array, Validators.required],
      nombre_sala: ['', Validators.required],
      pass_sala: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userData = this.userService.obtenerCredenciales();
    this.userService.getUserProfile(this.userData.id).subscribe(data => {
      this.premium = data.is_premium;
    });


    this.salaService.getSalasPorIDUser(this.userData.id).subscribe(data => {
      this.varPrueba = data;

      //comprobamos en caso de que no tenga ninguna sala
      if (data.length != 0) {
        this.salaService.getSalasPorIDPO(this.varPrueba[0].id).subscribe(data => {
          this.numSalasUser = data;
        })
      }else{
        this.numSalasUser = 0;
      }


    })

  }

  onSubmit() {
    //Comprueba si tiene la membresía para poder crear otra sala, en caso de que tenga ya una creada
    if (!this.premium && this.numSalasUser.length >= 1) {
      this.mensajeError = `Lo sentimos, ahora mismo eres dueño de ${this.numSalasUser.length} salas.
      Consigue la membresía premium para poder crear más salas.`
    } else {

    //Realiza la petición al servidor. En caso de que devuelva un error de validación, recoje el mensaje de error para mostrarlo en el formulario.
      this.salaService.postSala(this.crearSalaForm.value).subscribe(x=>{
        this.redireccionFormValido(x.nombre_sala)
      }, err=>{
        if(err instanceof HttpErrorResponse){
          const ValidationErrors = err.error;
          Object.keys(ValidationErrors).forEach(prop=>{
            const formControl = this.crearSalaForm.get(prop);
            if(formControl){
              formControl.setErrors({
                serverError: ValidationErrors[prop]
              })
            }
          })
        }
        this.mensajeError = err.error.message;
      });
    }



  }

  redireccionFormValido(nombre_sala:any){
    this.router.navigate(['sala-main/:' + nombre_sala]);
  }

}