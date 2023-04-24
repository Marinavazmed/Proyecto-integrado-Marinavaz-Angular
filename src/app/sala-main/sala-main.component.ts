import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceSalasService } from '../service-salas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasServiceService } from '../tareas-service.service';
import { UserProfileService } from '../user-profile.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sala-main',
  templateUrl: './sala-main.component.html',
  styles: [
  ]
})

export class SalaMainComponent implements OnInit{
  nombre_sala = this.route.snapshot.paramMap.get('nombre_sala')?.replace(":", '');
  sala: any;
  tareas:any;
  checkPO = false;
  //TAREAS DE EJEMPLO. Filtrar lista de tareas en grupos y mostrar
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router, private route: ActivatedRoute, private tareasService: TareasServiceService, public userService: UserProfileService) {
    this.tareasService.getTareasPorNombreSala(this.nombre_sala).subscribe(data=>{    
      this.tareas = data;
      console.log(this.tareas)
    })
  }  
  
  ngOnInit(): void {
    /*this.tareasService.getTareasPorNombreSala(this.nombre_sala).subscribe(data=>{    
      this.tareas = data;
      console.log(this.tareas)
    })*/
    this.compruebaSiPO()

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  abandonaSala(nombre_sala:any){
    this.salaService.leaveSala(nombre_sala)
  }

  borrarTarea(tarea_id:any){
    console.log("borrando tarea con id:" + tarea_id)
    this.tareasService.deleteTarea(tarea_id);
    this.tareas = this.tareas.filter(compruebaTarea);

    function compruebaTarea(tarea:any){
      return tarea.id!=tarea_id;
    }
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  //Devuelve true o false si el usuario = perfil admin de una sala
  async compruebaSiPO(){
    let prueba = await this.userService.compruebaPOasync(this.nombre_sala);
    if(prueba){
      this.checkPO=true
    }
  }
}
