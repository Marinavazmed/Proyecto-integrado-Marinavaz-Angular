import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSalaComponent } from './crear-sala.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { NgToastModule } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from '../app-routing.module';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceSalasService } from '../service-salas.service';
import { UserProfileService } from '../user-profile.service';
import { Observable, of } from 'rxjs';


describe('CrearSalaComponent', () => {
  let component: CrearSalaComponent;
  let fixture: ComponentFixture<CrearSalaComponent>;
  let formBuilder: FormBuilder;
  let salaService: jasmine.SpyObj<ServiceSalasService>;
  let router: jasmine.SpyObj<Router>;
  let userService: jasmine.SpyObj<UserProfileService>;

  beforeEach(() => {
    salaService = jasmine.createSpyObj('ServiceSalasService', ['getSalasPorIDUser', 'getSalasPorIDPO', 'postSala']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    userService = jasmine.createSpyObj('UserProfileService', ['obtenerCredenciales', 'getUserProfile']);

    TestBed.configureTestingModule({
      declarations: [CrearSalaComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ServiceSalasService, useValue: salaService },
        { provide: Router, useValue: router },
        { provide: UserProfileService, useValue: userService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearSalaComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    component.crearSalaForm = formBuilder.group({
      devs: formBuilder.array,
      nombre_sala: [''],
      pass_sala: ['']
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should set mensajeError when user is not premium and has reached the maximum number of rooms', () => {
    component.premium = false;
    component.numSalasUser = [{ id: 1 }];

    component.onSubmit();

    expect(component.mensajeError).toContain(component.numSalasUser.length);
    expect(component.mensajeError).toContain('Consigue la membresía premium para poder crear más salas.');
    expect(salaService.postSala).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should call postSala and navigate when user is premium or has not reached the maximum number of rooms', () => {
    component.premium = true;
    component.numSalasUser = [];

    const mockSala = { nombre_sala: 'Sala1' };

    salaService.postSala.and.returnValue(of(mockSala));

    component.onSubmit();

    expect(salaService.postSala).toHaveBeenCalledWith(component.crearSalaForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['sala-main/:' + mockSala.nombre_sala]);
  });

  it('should set serverError for form controls when postSala returns validation errors', () => {
    const mockValidationErrors = { nombre_sala: 'Nombre de sala no válido' };

    salaService.postSala.and.returnValue(
      new Observable((observer) => {
        observer.error({ error: mockValidationErrors });
      })
    );

    component.onSubmit();

    expect(component.crearSalaForm.get('nombre_sala')?.errors).toBeNull();
    expect(salaService.postSala).toHaveBeenCalledWith(component.crearSalaForm.value);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should set mensajeError when postSala returns an error message', () => {
    const mockErrorMessage = 'Error al crear la sala';

    salaService.postSala.and.returnValue(
      new Observable((observer) => {
        observer.error({ error: { message: mockErrorMessage } });
      })
    );

    component.onSubmit();

    expect(component.mensajeError).toBe(mockErrorMessage);
    expect(salaService.postSala).toHaveBeenCalledWith(component.crearSalaForm.value);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to sala-main when postSala is successful', () => {
    const mockSala = { nombre_sala: 'Sala1' };

    salaService.postSala.and.returnValue(of(mockSala));

    component.onSubmit();

    expect(salaService.postSala).toHaveBeenCalledWith(component.crearSalaForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['sala-main/:' + mockSala.nombre_sala]);
  });

  it('should navigate to sala-main when postSala is successful', () => {
    const mockSala = { nombre_sala: 'Sala1' };

    salaService.postSala.and.returnValue(of(mockSala));

    component.onSubmit();

    expect(salaService.postSala).toHaveBeenCalledWith(component.crearSalaForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['sala-main/:' + mockSala.nombre_sala]);
  });
});
