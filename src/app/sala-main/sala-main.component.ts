import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceSalasService } from '../service-salas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sala-main',
  templateUrl: './sala-main.component.html',
  styles: [
  ]
})

export class SalaMainComponent implements OnInit{
  crearSalaForm;
  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router) {
    this.crearSalaForm = this.formBuilder.group({
      devs: [this.formBuilder.array, Validators.required],
      nombre_sala: ['', Validators.required],
      pass_sala: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    //const sala= this.salaService.getSala(nombre_sala);
  }
    
  
}