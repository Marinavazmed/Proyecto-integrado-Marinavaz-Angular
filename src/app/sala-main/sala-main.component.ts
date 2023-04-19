import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceSalasService } from '../service-salas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasServiceService } from '../tareas-service.service';

@Component({
  selector: 'app-sala-main',
  templateUrl: './sala-main.component.html',
  styles: [
  ]
})

export class SalaMainComponent implements OnInit{
  nombre_sala:any;
  sala: any;
  tareas:any;
  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router, private route: ActivatedRoute, private tareasService: TareasServiceService) {
  }  
  
  ngOnInit(): void {
    this.nombre_sala = this.route.snapshot.paramMap.get('nombre_sala')?.replace(":", '');
    this.tareasService.getTareasPorNombreSala(this.nombre_sala).subscribe(data=>{    
      this.tareas = data;
    })
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
  
}
