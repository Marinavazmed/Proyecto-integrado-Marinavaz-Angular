import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceSalasService } from '../service-salas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasServiceService } from '../tareas-service.service';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { ThisReceiver } from '@angular/compiler';
import { getURLs } from '../utils';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styles: [
  ]
})

/*Este componente, que sólo contenía una vista con un formulario, ha sido introducido en sala-main dentro de varios modales de creación de tareas. Eliminar*/
export class CrearTareaComponent implements OnInit {
  crearTareaForm;
  public id_sala = "";
  lista_estados_salas:string[];

  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router, private route: ActivatedRoute, private tareasService: TareasServiceService) {
    
    this.lista_estados_salas = ['BACKLOG','SPRINT','DEPLOYED', 'WIP', 'DONE'];

    this.crearTareaForm = this.formBuilder.group({
      id_sala: ['', Validators.required],
      dev_asignado: ['', Validators.required],
      nombre_tarea: ['', Validators.required],
      desc_tarea: ['', Validators.required],
      estado_tarea:[formBuilder.array, Validators.required],
      tiempo_estimado: ['', Validators.required],
      puntos: ['', Validators.required]
    });
  }  
 
  ngOnInit(): void {
    this.getIdSala()
  }

  getIdSala(){
    let nombre_sala = this.route.snapshot.paramMap.get('nombre_sala')?.replace(":", "")
    this.salaService.getSala(nombre_sala).subscribe(
      data =>{
        console.log("data= " + data[0].id)
        this.id_sala = data[0].id
      }
    )
 }

  onSubmit(){
    //TODO: quitar hardcode en refactorizacion
    let url = `/sala-main/${this.route.snapshot.paramMap.get('nombre_sala')?.replace(":", "")}`
    let root = getURLs()
    this.crearTareaForm.controls['id_sala'].setValue(`${root}api/v1/sala/${this.id_sala}/`);
    this.tareasService.postTarea(this.crearTareaForm.value).subscribe()
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([url]);
    });
  }
}
