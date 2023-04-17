import { NgModule } from '@angular/core';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AuthGuard } from "./auth.guard";
import { UserRegistroComponent } from './user-registro/user-registro.component';
import { CrearSalaComponent } from './crear-sala/crear-sala.component';

const routes: Routes = [
  //se pueden pasar parámetros a traves de la url con la sintaxis:
  //{path: 'coche/:id'...}
  //En el constructor del componente debo declarar el id + usar actRoute
  {path: 'principal', component: IndexComponent},
  { path: 'login', component: UserLoginComponent },
  { path: 'registro', component: UserRegistroComponent},
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'crear_sala', component: CrearSalaComponent },
  {path: '', component: IndexComponent},
  {path: '**', component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }