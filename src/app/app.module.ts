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
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JoinSalaComponent } from './join-sala/join-sala.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { PagoComponent } from './pago/pago.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    IndexComponent,
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    UserRegistroComponent,
    CrearSalaComponent,
    SalaMainComponent,
    CrearTareaComponent,
    JoinSalaComponent,
    PagoComponent,
    CheckoutComponent,
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
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    NgbModule,
    FontAwesomeModule,
    DragDropModule,
    MatIconModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    [UserProfileService],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
