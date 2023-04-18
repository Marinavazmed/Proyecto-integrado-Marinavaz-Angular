import { Component, OnInit } from '@angular/core';
import { ServiceSalasService } from '../service-salas.service';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-crear-sala',
  templateUrl: './crear-sala.component.html',
  styles: [
  ]
})
export class CrearSalaComponent implements OnInit{
  crearSalaForm;
  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router) {
    this.crearSalaForm = this.formBuilder.group({
      devs: [this.formBuilder.array, Validators.required],
      nombre_sala: ['', Validators.required],
      pass_sala: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }
    
  onSubmit() {
    this.salaService.postSala(this.crearSalaForm.value).subscribe();
    const nombre_sala = this.crearSalaForm.get('nombre_sala')!.value;
    this.router.navigate(['sala-main/:'+nombre_sala]);
  }
  
}
