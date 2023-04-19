import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceSalasService } from '../service-salas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasServiceService } from '../tareas-service.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styles: [
  ]
})
export class CrearTareaComponent implements OnInit {
  crearTareaForm;
  lista_estados_salas:string[];
  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router, private route: ActivatedRoute, private tareasService: TareasServiceService) {
    this.lista_estados_salas = ['BACKLOG','SPRINT','DEPLOYED', 'WIP', 'DONE'];
    this.crearTareaForm = this.formBuilder.group({
      //1.- tomar id de la sala y autocompletar
      //2.-estado de tarea es desplegable entre todos estados de tareas de administrador
      dev_asignado: ['', Validators.required],
      nombre_tarea: ['', Validators.required],
      desc_tarea: ['', Validators.required],
      estado_tarea:[formBuilder.array, Validators.required],
      tiempo_estimado: ['', Validators.required],
      puntos: ['', Validators.required]
    });
  }  

  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(this.crearTareaForm.value)
    //this.tareasService.postTarea(this.crearTareaForm.value).subscribe()
  }
}
