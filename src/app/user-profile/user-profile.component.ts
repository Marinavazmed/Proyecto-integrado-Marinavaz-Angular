import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserProfileService } from "../user-profile.service";
import { UserProfile } from "../user-profile";
import { ServiceSalasService } from '../service-salas.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [],
  providers: [ServiceSalasService]
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile|null = null;
  public salas:Array<any>

  constructor(private userProfileService: UserProfileService, private activatedRoute: ActivatedRoute, private http:HttpClient, private _peticion: ServiceSalasService, public router: Router) { 
    this.salas = []
  }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userProfileService.getUserProfile(userId).subscribe({
        next: (data) => {
          console.log(data);
          this.userProfile = data;
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
    this._peticion.getSalas().subscribe(dataSalas=>{    
      console.log(dataSalas)
      this.salas = dataSalas;
    })

    
  }

  
  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  }

  