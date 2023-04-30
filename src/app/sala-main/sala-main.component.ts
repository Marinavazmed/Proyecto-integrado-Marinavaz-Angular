import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceSalasService } from '../service-salas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasServiceService } from '../tareas-service.service';
import { UserProfileService } from '../user-profile.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Tarea } from './tarea';
import { faCheck, faXmark, faBan, faPenToSquare, faPen } from '@fortawesome/free-solid-svg-icons';
import { Desarrollador } from './desarrollador';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sala-main',
  templateUrl: './sala-main.component.html',
  styles: [
  ]
})

export class SalaMainComponent implements OnInit, AfterViewInit{
  nombre_sala = this.route.snapshot.paramMap.get('nombre_sala')?.replace(":", '');
  sala: any;
  tareas:any;
  checkPO = false;
  perfilDEV: any;
  faCheck = faCheck;
  faError = faXmark;
  faDelete = faBan;
  faEdit = faPenToSquare;
  tareas_obj : Array<Tarea> = [];
  tareas_BACKLOG : Array <Tarea> = [];
  tareas_TODO : Array <Tarea> = [];
  tareas_WIP : Array <Tarea> = [];
  tareas_DONE : Array <Tarea> = [];

  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router, private route: ActivatedRoute, private tareasService: TareasServiceService, public userService: UserProfileService, private tareaService: TareasServiceService) {
    this.tareasService.getTareasPorNombreSala(this.nombre_sala).subscribe(data=>{    
      this.tareas = data;
      this.tareas.forEach((tarea: { id: string; id_sala: string; dev_asignado: any; nombre_tarea: string; desc_tarea: string; estado_tarea: string; tiempo_estimado: string; puntos: number; url: string; }) => {
        this.tareas_obj.push(new Tarea(tarea.id, tarea.id_sala, tarea.dev_asignado, tarea.nombre_tarea, tarea.desc_tarea, tarea.estado_tarea, tarea.tiempo_estimado, tarea.puntos, tarea.url))
      });
      this.tareas_BACKLOG = this.tareas_obj.filter((tarea)=> tarea.estado_tarea=="BACKLOG")
      this.tareas_TODO = this.tareas_obj.filter((tarea)=> tarea.estado_tarea=="SPRINT")
      this.tareas_WIP= this.tareas_obj.filter((tarea)=> tarea.estado_tarea=="WIP")
      this.tareas_DONE= this.tareas_obj.filter((tarea)=> tarea.estado_tarea=="DONE")
    })
  }  
  
  ngOnInit(): void {
    this.compruebaSiPO().then( x=>{
        this.getPerfilDEV();
    })
  }

  ngAfterViewInit():void{
  }

  drop(event: CdkDragDrop<Tarea[]>) {


    if(this.confirma(event.container)){
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
      //CUIDADO: Si el usuario NO ES PERFIL DEV fallará
      let perfilCAMBIO = this.perfilDEV;
      if(this.checkPO){
        perfilCAMBIO = [];
      }

      //ERROR: event.container.data[0] SOLO TOMA LA PRIMERA TAREA DE LA LISTA.
      this.cambiaEstadoTarea(event.container.data[event.currentIndex], perfilCAMBIO,event.previousContainer.id, event.container.id);

    }

  }

  confirma(eventcontainer:any): boolean{
    return confirm("¿Está seguro de que desea cambiar el estado de la tarea ?" );
  }

  cambiaEstadoTarea(tarea:any, dev:any, id_prev_container:any, id_curr_container:any){
    //peticion server estado tarea
    if(!this.checkPO){
      tarea.dev_asignado=dev.url
    }

    switch(id_curr_container){
      case "cdk-drop-list-0":
        tarea.estado_tarea = "SPRINT"
        break;
      case "cdk-drop-list-1":
        tarea.estado_tarea = "WIP"
        break;
      case "cdk-drop-list-2":
        tarea.estado_tarea = "DONE"
        break;
      default:
        console.log("No se ha podido identificar el estado de la tarea")
    }
    this.tareaService.putTarea(tarea)
  }

  abandonaSala(nombre_sala:any){
    this.salaService.leaveSala(nombre_sala)
  }

  eliminaSala(nombre_sala:any){
    if(confirm("¿Estás seguro de que deseas eliminar esta sala?")){
      this.salaService.deleteSala(nombre_sala)
      this.router.navigate([`/user-profile/${this.userService.obtenerCredenciales().id}`]);
    }

  }

  editTarea(){
    console.log("ENTRA EN EDIT")
  }


  borrarTarea(tarea_id:any){
    console.log("borrando tarea con id:" + tarea_id)
    if(confirm("¿Estás seguro de que deseas eliminar esta tarea?")){
      this.tareasService.deleteTarea(tarea_id);
      this.tareas = this.tareas.filter(compruebaTarea);
  
      function compruebaTarea(tarea:any){
        return tarea.id!=tarea_id;
      }
      window.location.reload()
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

  getPerfilDEV(){
    let desarrollador:any;
    this.userService.getPDPorUserAuth().subscribe(data=>{
      desarrollador = new Desarrollador(data.id, data.usuario, data.url, data.puntuacion)
      this.perfilDEV = desarrollador;
    })
  }
}
