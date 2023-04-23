import { Component, OnInit } from '@angular/core';
import { ServiceSalasService } from '../service-salas.service';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { UserProfileService } from '../user-profile.service';
import { Usuario } from '../user-login/usuario';

@Component({
  selector: 'app-crear-sala',
  templateUrl: './crear-sala.component.html',
  styles: [
  ]
})
export class CrearSalaComponent implements OnInit{
  crearSalaForm;
  premium = false;
  userData =  this.userService.obtenerCredenciales();
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
    console.log(this.userData.id)
    this.userService.getUserProfile(this.userData.id).subscribe(data =>{
      this.premium = data.is_premium;
    });
    this.salaService.getSalasPorIDUser(this.userData.id).subscribe(data =>{
      this.varPrueba = data;
      this.salaService.getSalasPorIDPO(this.varPrueba[0].id).subscribe(data =>{
        this.numSalasUser = data;
      })
      
    })
    
  }
    
  onSubmit() {
    
    //TODO: Con premium + numSalaUser comprobar si puede o no hacer una sala con postSala
    if(!this.premium && this.numSalasUser.length>=1){
      this.mensajeError =`Lo sentimos, ahora mismo eres dueño de ${this.numSalasUser.length} salas.
      Consigue la membresía premium para poder crear más salas.`
    }else{
      this.salaService.postSala(this.crearSalaForm.value).subscribe();
      const nombre_sala = this.crearSalaForm.get('nombre_sala')!.value;
      this.router.navigate(['sala-main/:'+nombre_sala]);
    }
    

  }
  
}
