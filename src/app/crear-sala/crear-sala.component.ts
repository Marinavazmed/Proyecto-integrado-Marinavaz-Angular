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
    console.log(this.crearSalaForm.value)
    this.salaService.postSala(this.crearSalaForm.value).subscribe();
  }
  
}
