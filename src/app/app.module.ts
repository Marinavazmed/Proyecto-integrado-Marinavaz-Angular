import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./token.interceptor";
import { UserProfileService } from './user-profile.service';
import { UserRegistroComponent } from './user-registro/user-registro.component';
import { CrearSalaComponent } from './crear-sala/crear-sala.component';
import { SalaMainComponent } from './sala-main/sala-main.component';

@NgModule({
  declarations: [
    IndexComponent,
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    UserRegistroComponent,
    CrearSalaComponent,
    SalaMainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    [UserProfileService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
