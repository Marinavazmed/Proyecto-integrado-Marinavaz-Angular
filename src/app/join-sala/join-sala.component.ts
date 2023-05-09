import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceSalasService } from '../service-salas.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserProfileService } from '../user-profile.service';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-join-sala',
  templateUrl: './join-sala.component.html',
  styles: [
  ]
})
export class JoinSalaComponent implements OnInit {
  joinSalaForm;
  sala: any;
  urlSalas: any;
  checkUser:any;
  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router, private route: ActivatedRoute, private userService:UserProfileService) {
    this.checkUser=localStorage.getItem("userData");
    this.urlSalas = JSON.parse(this.checkUser).id;

    this.joinSalaForm = this.formBuilder.group({
      id:['', Validators.required],
      prod_owner: ['', Validators.required],
      devs: [formBuilder.array, Validators.required],
      nombre_sala: ['', Validators.required],
      pass_sala: ['', Validators.required],
      url: ['', Validators.required]
    });

  } 
  
  /*Esta funcion toma los datos de desarrollador del user autenticado y los almacena en session antes de que se introduzca en una nueva sala.*/
  ngOnInit(){
    this.userService.getPDPorUserAuth().subscribe(data=>{
      sessionStorage.setItem("perfilDEV", JSON.stringify(data));
    })
  }
  
  onSubmit(){
    //TODO: Add validaciones (pruebas de union de sala erronea, credenciales no validas, etc.)
    this.salaService.joinSala(this.joinSalaForm.value);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/user-profile/'+this.urlSalas]);
    });
  }
}
