import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceSalasService } from '../service-salas.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-join-sala',
  templateUrl: './join-sala.component.html',
  styles: [
  ]
})
export class JoinSalaComponent implements OnInit {
  joinSalaForm;
  sala: any;
  constructor(private formBuilder: FormBuilder, private salaService: ServiceSalasService, public router: Router, private route: ActivatedRoute, private userService:UserProfileService) {
    this.joinSalaForm = this.formBuilder.group({
      id:['', Validators.required],
      prod_owner: ['', Validators.required],
      devs: [formBuilder.array, Validators.required],
      nombre_sala: ['', Validators.required],
      pass_sala: ['', Validators.required],
      url: ['', Validators.required]
    });
  } 
  
  ngOnInit(){
  }

  
  onSubmit(){
    //añadir usuario a devs
    this.salaService.joinSala(this.joinSalaForm.value)
    this.router.navigate([``]);
  }
}
