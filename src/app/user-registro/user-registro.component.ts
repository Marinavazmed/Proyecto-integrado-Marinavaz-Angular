import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UserCredentials } from "../auth";
import { Router } from "@angular/router";
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-user-registro',
  templateUrl: './user-registro.component.html',
  styles: [
  ]
})

export class UserRegistroComponent implements OnInit{
  registroForm;
  constructor(private formBuilder: FormBuilder, private UserProfileService: UserProfileService, public router: Router) {
    this.registroForm = this.formBuilder.group({
      username: ['' as string | null, Validators.required],
      password:  ['' as string | null, Validators.required],
      first_name:  ['' as string | null, Validators.required],
      last_name:  ['' as string | null, Validators.required],
      email:  ['' as string | null, Validators.required],
      created_at: new Date(),
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registroForm.value)
    this.UserProfileService.postUser(this.registroForm.value).subscribe();
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}
