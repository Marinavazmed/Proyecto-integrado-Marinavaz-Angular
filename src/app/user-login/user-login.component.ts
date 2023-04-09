import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UserCredentials } from "../auth";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: [
  ]
})
export class UserLoginComponent implements OnInit {
  logInForm;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
   this.logInForm = this.formBuilder.group({
     username: ['', Validators.required],
     password: ['', Validators.required]
   });
  }

  ngOnInit(): void {
  }

  logInUser(user: UserCredentials): void {
   this.authService.logIn(user.username, user.password).subscribe({
     next: (data) => {
       console.log(data);
     },
     error: (error) => {
       console.log(error);
     }
   }
   );
  }

  onSubmit(formData: UserCredentials): void {
    if (this.logInForm.invalid) {
      console.log(this.logInForm.errors);
    } else {
      this.logInUser(formData);
    }
  }
}