import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceSalasService } from '../service-salas.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { UserProfileService } from '../user-profile.service';
import { compileNgModule } from '@angular/compiler';
import { po } from 'src/po';

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
  checkUser: any;
  credenciales_error = "";
  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router, private route: ActivatedRoute, private userService: UserProfileService) {
    this.checkUser = localStorage.getItem("userData");
    this.urlSalas = JSON.parse(this.checkUser).id;

    this.joinSalaForm = this.formBuilder.group({
      id: ['', Validators.required],
      prod_owner: ['', Validators.required],
      devs: [formBuilder.array, Validators.required],
      nombre_sala: ['', Validators.required],
      pass_sala: ['', Validators.required],
      url: ['', Validators.required]
    });

    this.userService.getPDPorUserAuth().subscribe(data => {
      sessionStorage.setItem("perfilDEV", JSON.stringify(data));
    })

  }

  /*Esta funcion toma los datos de desarrollador del user autenticado y los almacena en session antes de que se introduzca en una nueva sala.*/
  ngOnInit() {
    this.userService.getPDPorUserAuth().subscribe(data => {
      sessionStorage.setItem("perfilDEV", JSON.stringify(data));
    })
  }

  onSubmit(){
    this.salaService.getSala(this.joinSalaForm.get('nombre_sala')?.value).subscribe(data => {
      console.log(data)
      if (data.length != 0) {
        //Si existe la sala comprueba las credenciales
        if (data[0].pass_sala == this.joinSalaForm.get('pass_sala')?.value && data[0].nombre_sala == this.joinSalaForm.get('nombre_sala')?.value) {
          let url = data[0].url
          this.joinSalaForm.controls['id'].setValue(data[0].id)
          this.joinSalaForm.controls['prod_owner'].setValue(data[0].prod_owner)

          //2.-actualiza la lista devs de la sala añadiendo al usuario actual. El dev debe ser el usuario autenticado bajo
          //un perfil Profile_DEV
          let perfilDEV = JSON.parse(sessionStorage.getItem("perfilDEV")!);
          let perfil = new po(perfilDEV.id, perfilDEV.usuario, perfilDEV.url, perfilDEV.puntuacion)
          let arraydevs = []
          arraydevs.push(perfil)
          for (let i = 0; i < data[0].devs.length; i++) {
            let dev = new po(data[0].devs[i].id, data[0].devs[i].usuario, data[0].devs[i].url, data[0].devs[i].puntuacion)
            console.log(dev)
            arraydevs.push(dev)
          }
          this.joinSalaForm.controls['url'].setValue(url)
          //aquí petición put con nuevos valores de devs (arraydevs). url + values + arraydevs
          this.salaService.putSala(this.joinSalaForm.get('url')?.value, this.joinSalaForm.value, arraydevs).subscribe({
            next: (data) => {
            },
            error: (error) => {
            },
            complete: (()=>{
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate(['/user-profile/'+this.urlSalas])
              });
            })})

        } else {
          console.log("Credenciales de la sala incorrectas")
          document.getElementById("openModalButton")?.click();
          this.joinSalaForm.reset();
        }
      }else{
        console.log("credenciales incorrectas")
        document.getElementById("openModalButton")?.click();
        this.joinSalaForm.reset();
      }
    })
      //VERSION ANTIGUA
    /*this.salaService.joinSala(this.joinSalaForm.value);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/user-profile/'+this.urlSalas])
    });*/
  }





}
