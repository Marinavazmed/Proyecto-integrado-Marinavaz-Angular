import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserProfileService } from "../user-profile.service";
import { UserProfile } from "../user-profile";
import { ServiceSalasService } from '../service-salas.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { getURLs } from '../utils';
import { sala } from '../sala-main/sala';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [],
  providers: [ServiceSalasService, UserProfileService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UserProfileComponent
    }
  ]
})
export class UserProfileComponent implements OnInit, ControlValueAccessor {
  userProfile: UserProfile | null = null;
  userId: any;
  faPhoto = faPen;
  faGoInSala = faLocationArrow;
  public salas: Array<any>
  public salas_PO: Array<any>
  public url_user_PO: any;
  public file: string = '';
  public form! :FormGroup;
  currentDate = new Date();
  constructor(private userProfileService: UserProfileService, private activatedRoute: ActivatedRoute, private http: HttpClient, private _peticion: ServiceSalasService, public router: Router, public loginService: AuthService, private profilepicForm: FormBuilder) {
    this.salas = []
    this.salas_PO = []
    this.userId = this.userProfileService.obtenerCredenciales().id
    this.form = this.profilepicForm.group({
      profile_pic: File,
      email: '',
      first_name: '',
      last_name: '',
      username: '',
    });
  }

  /*Interfaz ControlValueAccessor */
  onChange = (fileUrl: string) => { };

  onTouched = () => { };

  disabled: boolean = false;

  writeValue(_file: string): void {
    this.file = _file;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  /**/

  /*Guarda en el local el perfil*/
  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userProfileService.getUserProfile(userId).subscribe({
      next: (data) => {
        this.userProfile = data;
        localStorage.setItem("profile", data);
        //rellenamos el formulario
        this.form.controls['email'].setValue(data.email);
        this.form.controls['first_name'].setValue(data.first_name);
        this.form.controls['last_name'].setValue(data.last_name);
        this.form.controls['username'].setValue(data.username);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => this.filtraSalas()
    }
    );
    this._peticion.getSalasParticipante().subscribe(dataSalas => {
      this.salas = dataSalas;
    })

  }

  filtraSalas(): void {
    this.userProfileService.getPOPorUserAuth().subscribe({
      next: (data) => {
        if (data) {
          this.url_user_PO = data.url;
          this.salas_PO = this.salas.filter((sala) => sala.prod_owner == this.url_user_PO)
          this.salas = this.salas.filter((sala) => sala.prod_owner != this.url_user_PO)
          //Puede sacar id para mejor busqueda
        }
      }
    })
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }


  joinSala() {
    this.router.navigate(['join-sala'])
  }


  logOut() {
    this.loginService.logOut()
    this.router.navigate(['index'])
  }

  /*FILE IMAGEN*/
  onFileChange(event: any) {
    const files = event.target.files as FileList;
    let uploadedImage:File;
    uploadedImage = event.target.files[0];
    const imageFormData = new FormData()
    imageFormData.append('profile_pic', uploadedImage)

    if(uploadedImage!=null){
      imageFormData.append('email', this.form.get('email')?.value)
      imageFormData.append('first_name', this.form.get('first_name')?.value)
      imageFormData.append('last_name', this.form.get('last_name')?.value)
      imageFormData.append('username',this.form.get('username')?.value)
    }

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      console.log(_file)
      this.userProfileService.uploadFileForm(imageFormData, this.userId).subscribe()
      //this.resetInput();
    }

  }

  resetInput() {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }

}

