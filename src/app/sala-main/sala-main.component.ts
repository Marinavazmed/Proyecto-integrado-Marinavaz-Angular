import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceSalasService } from '../service-salas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasServiceService } from '../tareas-service.service';
import { UserProfileService } from '../user-profile.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Tarea } from './tarea';
import { faCheck, faXmark, faBan, faPenToSquare, faPen, faLandmark } from '@fortawesome/free-solid-svg-icons';
import { Desarrollador } from './desarrollador';
import { Observable } from 'rxjs';
import { po } from 'src/po';
import { sala_put_service } from './sala-put-service';
import { getURLs } from '../utils';

@Component({
  selector: 'app-sala-main',
  templateUrl: './sala-main.component.html',
  styles: [
  ]
})

export class SalaMainComponent implements OnInit, AfterViewInit {
  nombre_sala = this.route.snapshot.paramMap.get('nombre_sala')?.replace(":", '');
  sala: any;
  tareas: any;
  checkPO = false;
  perfilDEV: any;
  faCheck = faCheck;
  faError = faXmark;
  faDelete = faBan;
  faEdit = faPenToSquare;
  faNotes = faLandmark;
  editarTareaForm: any;
  crearTareaForm: any;
  tarea_history:any;
  tareas_obj: Array<Tarea> = [];
  tareas_BACKLOG: Array<Tarea> = [];
  tareas_TODO: Array<Tarea> = [];
  tareas_WIP: Array<Tarea> = [];
  tareas_DONE: Array<Tarea> = [];
  id_sala: any;
  p:number=1;
  paginationLabels = {
    first: 'Primera',
    previous: 'Anterior',
    next: 'Siguiente',
    last: 'Última'
  }


  /*En el constructor: Llama a todas las tareas, las pasa a objeto y las organiza. Un formulario para la edicion y otro para la creacion de tareas*/
  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router, private route: ActivatedRoute, private tareasService: TareasServiceService, public userService: UserProfileService, private tareaService: TareasServiceService) {
    this.tareasService.getTareasPorNombreSala(this.nombre_sala).subscribe(data => {
      this.tareas_obj=[];
      this.tareas = data;
      this.tareas.forEach((tarea: { id: string; id_sala: string; dev_asignado: any; nombre_tarea: string; desc_tarea: string; estado_tarea: string; tiempo_estimado: string; puntos: number; datos_user_dev: string, history: string, url: string; }) => {
        this.tareas_obj.push(new Tarea(tarea.id, tarea.id_sala, tarea.dev_asignado, tarea.nombre_tarea, tarea.desc_tarea, tarea.estado_tarea, tarea.tiempo_estimado, tarea.puntos, tarea.url, tarea.datos_user_dev, tarea.history))
        if(this.tareas_obj[this.tareas_obj.length-1].datos_user_dev){
          console.log(this.tareas_obj[this.tareas_obj.length-1].datos_user_dev.username)
        }

      });
      this.tareas_BACKLOG = this.tareas_obj.filter((tarea) => tarea.estado_tarea == "BACKLOG")
      this.tareas_TODO = this.tareas_obj.filter((tarea) => tarea.estado_tarea == "SPRINT")
      this.tareas_WIP = this.tareas_obj.filter((tarea) => tarea.estado_tarea == "WIP")
      this.tareas_DONE = this.tareas_obj.filter((tarea) => tarea.estado_tarea == "DONE")
    }),
      this.editarTareaForm = this.formBuilder.group({
        id: ['', Validators.required],
        id_sala: ['', Validators.required],
        dev_asignado: ['', Validators.required],
        nombre_tarea: [null, Validators.required],
        desc_tarea: [null, Validators.required],
        estado_tarea: [formBuilder.array, Validators.required],
        tiempo_estimado: [null, Validators.required],
        puntos: [null, Validators.required],
        url: ['', Validators.required]
      }),

      this.crearTareaForm = this.formBuilder.group({
        id: ['', Validators.required],
        id_sala: ['', Validators.required],
        dev_asignado: ['', Validators.required],
        nombre_tarea: [null, Validators.required],
        desc_tarea: [null, Validators.required],
        estado_tarea: [formBuilder.array, Validators.required],
        tiempo_estimado: [null, Validators.required],
        puntos: [null, Validators.required],
        url: ['', Validators.required]
      });

  }

  /*Al cargar la pagina comprueba si el usuario autenticado es el PO de la sala. Tras ello toma tambien su perfil de DEV y el id de la sala*/
  ngOnInit(): void {
    this.compruebaSiPO().then(x => {
      this.getPerfilDEV();
    })
    this.salaService.getSala(this.nombre_sala).subscribe(
      data => {
        this.id_sala = data[0].id
      }
    )
}

  /*Util para usos posteriores y react*/
  ngAfterViewInit(): void {
  }

  ngOnChanges() {

  }

  /*evento de la libreria. el container contiene los datos del objeto, la posicion previa y actual en el contenedor. 
  antes de hacer el put comprueba si es PO para no adjudicarle la tareaen caso de que lo sea*/
  drop(event: CdkDragDrop<Tarea[]>) {
    if (this.confirma(event.container)) {
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
      let perfilCAMBIO = this.perfilDEV;
      if (this.checkPO) {
        perfilCAMBIO = [];
      }
      if(event.container.data[event.currentIndex] == undefined){
        this.cambiaEstadoTarea(event.container.data[0], perfilCAMBIO, event.previousContainer.id, event.container.id);
      }else{
        this.cambiaEstadoTarea(event.container.data[event.currentIndex], perfilCAMBIO, event.previousContainer.id, event.container.id);
      }

    }

  }

  confirma(eventcontainer: any): boolean {
    return confirm("¿Está seguro de que desea cambiar el estado de la tarea ?");
  }

  cambiaEstadoTarea(tarea: any, dev: any, id_prev_container: any, id_curr_container: any) {
    //Atribuye la tarea arrastrada al usuario logeado en caso de que sea DEV.
    //Comprueba y cambia el nuevo estado de la tarea antes de hacer el put
    if (this.checkPO && id_curr_container=="contenedor_backlog") {
      tarea.dev_asignado = null;
    }else if(this.checkPO){
      tarea.dev_asignado = tarea.dev_asignado
    }else{
      tarea.dev_asignado=dev.url
    }
    switch (id_curr_container) {
      case "contenedor_backlog":
        tarea.estado_tarea = "BACKLOG"
        break;
      case "contenedor_todo":
        tarea.estado_tarea = "SPRINT"
        break;
      case "contenedor_wip":
        tarea.estado_tarea = "WIP"
        break;
      case "contenedor_done":
        tarea.estado_tarea = "DONE"
        break;
      default:
        console.log("No se ha podido identificar el estado de la tarea")
    }
    this.tareaService.putTarea(tarea)
  }

  abandonaSala(nombre_sala: any) {
    this.salaService.getSala(nombre_sala).subscribe(data => {
      //Crea obj perfil con credenciales de logeo
      let perfilDEV = JSON.parse(sessionStorage.getItem("perfilDEV")!);
      let perfil = new po(perfilDEV.id, perfilDEV.usuario, perfilDEV.url, perfilDEV.puntuacion)
      let arraydevs = [];
      for (let i = 0; i < data[0].devs.length; i++) {
        let dev = new po(data[0].devs[i].id, data[0].devs[i].usuario, data[0].devs[i].url, data[0].devs[i].puntuacion)
        if (dev.id != perfil.id) {
          arraydevs.push(dev)
        }
      }
      //Crea un objeto sala con todos los desarrolladores menos el dev logeado:
      let sala_put = new sala_put_service(data[0].id, data[0].prod_owner, arraydevs, data[0].nombre_sala, data[0].pass_sala, data[0].url)
      this.salaService.leaveSala(sala_put)
      this.router.navigate([`/user-profile/${this.userService.obtenerCredenciales().id}`]);
    })



  }

  eliminaSala(nombre_sala: any) {
    if (confirm("¿Estás seguro de que deseas eliminar esta sala?")) {
      this.salaService.deleteSala(nombre_sala)
      this.router.navigate([`/user-profile/${this.userService.obtenerCredenciales().id}`]);
    }

  }

  borrarTarea(tarea_id: any) {
    console.log("borrando tarea con id:" + tarea_id)
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      this.tareasService.deleteTarea(tarea_id).subscribe()
      this.tareas_BACKLOG = this.tareas_BACKLOG.filter(compruebaTarea);
      this.tareas_TODO = this.tareas_TODO.filter(compruebaTarea);
      this.tareas_WIP = this.tareas_WIP.filter(compruebaTarea);
      this.tareas_DONE = this.tareas_DONE.filter(compruebaTarea);

      function compruebaTarea(tarea: any) {
        return tarea.id != tarea_id;
      }
    }
  }

  creaTarea() {
    let url = `/sala-main/${this.route.snapshot.paramMap.get('nombre_sala')?.replace(":", "")}`
    let root = getURLs()
    this.crearTareaForm.controls['id_sala'].setValue(`${root}api/v1/sala/${this.id_sala}/`);
    this.crearTareaForm.controls['estado_tarea'].setValue('BACKLOG');
    this.tareasService.postTarea(this.crearTareaForm.value).subscribe(data => {
      this.tareas_BACKLOG.push(new Tarea(data.id, data.id_sala, data.dev_asignado, data.nombre_tarea, data.desc_tarea, data.estado_tarea,
        data.tiempo_estimado, data.puntos, data.url))
    })
    this.crearTareaForm.reset()
    document.getElementById("btn_cierre_crear")?.click()
  }

  editTarea() {
    /*TODO: Editar método update en serializador en BACKEND para hacer de sólo lectura los campos id, id_sala, y url. Esto esta hardcodeado y esta to feo*/
    let tarea_put = new Tarea(this.editarTareaForm.get('id').value, this.editarTareaForm.get('id_sala').value, this.editarTareaForm.get('dev_asignado').value,
      this.editarTareaForm.get('nombre_tarea').value, this.editarTareaForm.get('desc_tarea').value, this.editarTareaForm.get('estado_tarea').value,
      this.editarTareaForm.get('tiempo_estimado').value, this.editarTareaForm.get('puntos').value, this.editarTareaForm.get('url').value)

    switch (tarea_put.estado_tarea) {
      case "BACKLOG":
        this.tareas_BACKLOG=this.actualizaCDKafterPut(this.tareas_BACKLOG, tarea_put)
        break;
      case "SPRINT":
        this.tareas_TODO=this.actualizaCDKafterPut(this.tareas_TODO, tarea_put)
        break;
      case "WIP":
        this.tareas_WIP=this.actualizaCDKafterPut(this.tareas_WIP, tarea_put)
        break;
      case "DONE":
        this.tareas_DONE=this.actualizaCDKafterPut(this.tareas_DONE, tarea_put)
        break;
      default:
        console.log("No se ha podido identificar el estado de la tarea")
    }

    this.tareaService.putTareaObservable(tarea_put).subscribe(data => {
      console.log(data)
    })
    document.getElementById("btn_cierre")?.click()
  }

  /*Pruebas para refactorizar y remodelar el array del contenedor CDK cuando se realiza un cambio en la tarea*/
  actualizaCDKafterPut(lista:any, tarea_put:any):Array<Tarea>{
    let objIndex = lista.findIndex(((obj: { id: any; }) => obj.id == tarea_put.id));
    lista[objIndex].nombre_tarea = tarea_put.nombre_tarea;
    lista[objIndex].desc_tarea=tarea_put.desc_tarea
    lista[objIndex].tiempo_estimado = tarea_put.tiempo_estimado
    lista[objIndex].puntos = tarea_put.puntos
    return lista;
  }


  setValuesFormEdit(tarea: any) {
    /*TODO: Editar método update en serializador en BACKEND para hacer de sólo lectura los campos id, id_sala, y url. Esto esta hardcodeado y esta to feo*/
    this.editarTareaForm.controls['id'].setValue(tarea.id)
    this.editarTareaForm.controls['id_sala'].setValue(tarea.id_sala)
    this.editarTareaForm.controls['dev_asignado'].setValue(tarea.dev_asignado)
    this.editarTareaForm.controls['nombre_tarea'].setValue(tarea.nombre_tarea)
    this.editarTareaForm.controls['desc_tarea'].setValue(tarea.desc_tarea)
    this.editarTareaForm.controls['estado_tarea'].setValue(tarea.estado_tarea)
    this.editarTareaForm.controls['tiempo_estimado'].setValue(tarea.tiempo_estimado)
    this.editarTareaForm.controls['puntos'].setValue(tarea.puntos)
    this.editarTareaForm.controls['url'].setValue(tarea.url)
  }


  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  async compruebaSiPO() {
    //Devuelve true o false si el usuario = perfil admin de una sala. Asincrono (prioridad en ciclo de vida)
    let prueba = await this.userService.compruebaPOasync(this.nombre_sala);
    if (prueba) {
      this.checkPO = true
    }
  }

  getPerfilDEV() {
    //Mete en la variable perfilDEV del componente un objeto Desarrollador con los datos del Profile_DEV obtenidos a partir del usuario logeado en el momento de carga.
    let desarrollador: any;
    this.userService.getPDPorUserAuth().subscribe(data => {
      desarrollador = new Desarrollador(data.id, data.usuario, data.url, data.puntuacion)
      this.perfilDEV = desarrollador;
    })
  }

  refrescarTareas() {
    this.tareas_obj = []
    this.tareasService.getTareasPorNombreSala(this.nombre_sala).subscribe(data => {
      this.tareas = data;
      this.tareas.forEach((tarea: { id: string; id_sala: string; dev_asignado: any; nombre_tarea: string; desc_tarea: string; estado_tarea: string; tiempo_estimado: string; puntos: number; url: string; }) => {
        this.tareas_obj.push(new Tarea(tarea.id, tarea.id_sala, tarea.dev_asignado, tarea.nombre_tarea, tarea.desc_tarea, tarea.estado_tarea, tarea.tiempo_estimado, tarea.puntos, tarea.url))
      });
      this.tareas_BACKLOG = this.tareas_obj.filter((tarea) => tarea.estado_tarea == "BACKLOG")
      this.tareas_TODO = this.tareas_obj.filter((tarea) => tarea.estado_tarea == "SPRINT")
      this.tareas_WIP = this.tareas_obj.filter((tarea) => tarea.estado_tarea == "WIP")
      this.tareas_DONE = this.tareas_obj.filter((tarea) => tarea.estado_tarea == "DONE")
    })
  }

  historico_tarea(id:any){
    this.tareaService.getTarea(id).subscribe({
      next: (data) => {
        this.tarea_history=data.history;
      },
      error: (error) => {
      },
      complete: (()=>{
        //abre modal
        document.getElementById("btn_historial_modal")?.click()
      })
    });
  }

  


}
