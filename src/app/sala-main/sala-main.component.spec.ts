import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaMainComponent } from './sala-main.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Desarrollador } from './desarrollador';
import { Tarea } from './tarea';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TareasServiceService } from '../tareas-service.service';
import { ServiceSalasService } from '../service-salas.service';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../user-profile.service';
import { sala_put_service } from './sala-put-service';
import { TareaServiceService } from '../tarea-service.service';

describe('SalaMainComponent', () => {
  let component: SalaMainComponent;
  let fixture: ComponentFixture<SalaMainComponent>;
  let tarea = new Tarea(
    '1',
    '1',
    'dev1',
    'Tarea 1',
    'Descripción de la tarea 1',
    'Pendiente',
    '2h',
    'URGENTE',
    'https://example.com',
    { user: 'user1' },
    ['history1', 'history2']
  );
  let desarrollador: Desarrollador;
  let tareaService: TareasServiceService;
  let salaService;
  let sessionStorage;
  let salaPut: sala_put_service;
  let httpMock: HttpTestingController;
  let service: TareasServiceService;
  let userServiceMock: any;
  salaPut = new sala_put_service(
    '123',
    'prod_owner',
    [{ id: '1', usuario: 'dev1', url: 'url1', puntuacion: 5 }],
    'nombre_sala',
    'pass_sala',
    'url'
  ),

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [SalaMainComponent],
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
          NgxPaginationModule,
          NgToastModule,
          HttpClientTestingModule,
        ],
        providers: [TareasServiceService, ReactiveFormsModule, SalaMainComponent, { provide: UserProfileService, useValue: userServiceMock }]
      }).compileComponents();

      sessionStorage = {
        getItem: jasmine.createSpy('getItem').and.returnValue(JSON.stringify({
          id: 'dev_id',
          usuario: 'dev_usuario',
          url: 'dev_url',
          puntuacion: 0
        }))
      };
      userServiceMock = {
        getPDPorUserAuth: jasmine.createSpy('getPDPorUserAuth').and.returnValue({ subscribe: (fn: any) => fn({}) })
      };
      salaService = {
        getSala: jasmine.createSpy('getSala').and.returnValue(of([{
          id: 'sala_id',
          prod_owner: 'prod_owner',
          devs: [
            { id: 'dev1_id', usuario: 'dev1_usuario', url: 'dev1_url', puntuacion: 0 },
            { id: 'dev2_id', usuario: 'dev2_usuario', url: 'dev2_url', puntuacion: 0 }
          ],
          nombre_sala: 'nombre_sala',
          pass_sala: 'pass_sala',
          url: 'sala_url'
        }])),
        leaveSala: jasmine.createSpy('leaveSala').and.returnValue(of({})),
      };
      fixture = TestBed.createComponent(SalaMainComponent);
      component = fixture.componentInstance;
      desarrollador = new Desarrollador('1', 'usuario1', 'https://example.com', 5);
      tareaService = TestBed.inject(TareasServiceService);
      service = TestBed.inject(TareasServiceService);
      httpMock = TestBed.inject(HttpTestingController);
      fixture.detectChanges();
    });


  //tarea.ts
  it('should create an instance of Tarea', () => {
    expect(tarea).toBeTruthy();
  });

  it('should have the correct properties', () => {
    expect(tarea.id).toEqual('1');
    expect(tarea.id_sala).toEqual('1');
    expect(tarea.dev_asignado).toEqual('dev1');
    expect(tarea.nombre_tarea).toEqual('Tarea 1');
    expect(tarea.desc_tarea).toEqual('Descripción de la tarea 1');
    expect(tarea.estado_tarea).toEqual('Pendiente');
    expect(tarea.tiempo_estimado).toEqual('2h');
    expect(tarea.prioridad).toEqual('URGENTE');
    expect(tarea.url).toEqual('https://example.com');
  });

  it('should have a correct string representation', () => {
    const toStringResult = tarea.toString();
    expect(toStringResult).toEqual('Tarea 1');
  });

  //desarrollador ts
  it('should create an instance of Desarrollador', () => {
    expect(desarrollador).toBeTruthy();
  });

  it('should have the correct properties', () => {
    expect(desarrollador.id).toEqual('1');
    expect(desarrollador.usuario).toEqual('usuario1');
    expect(desarrollador.url).toEqual('https://example.com');
    expect(desarrollador.puntuacion).toEqual(5);
  });

  it('should have a correct string representation', () => {
    const toStringResult = desarrollador.toString();
    expect(toStringResult).toEqual('1');
  });


  //cambio de estados en tareas

  it('should not assign task to DEV when user is a PO', () => {
    spyOn(tareaService, 'putTarea');

    const tarea = {
      id: '123',
      dev_asignado: null,
      estado_tarea: 'BACKLOG'
    };
    const dev = tarea.dev_asignado;
    const id_prev_container = 'contenedor_backlog';
    const id_curr_container = 'contenedor_todo';
    component.checkPO = true;

    component.cambiaEstadoTarea(tarea, dev, id_prev_container, id_curr_container);

    expect(tarea.dev_asignado).toBeNull();
    expect(tarea.estado_tarea).toBe('SPRINT');
  });

  it('should set task state as BACKLOG when container is "contenedor_backlog"', () => {
    spyOn(tareaService, 'putTarea');

    const tarea = {
      id: '123',
      dev_asignado: 'dev-url',
      estado_tarea: 'SPRINT'
    };
    const dev = { url: 'dev-url' };
    const id_prev_container = 'contenedor_todo';
    const id_curr_container = 'contenedor_backlog';
    component.checkPO = false;

    component.cambiaEstadoTarea(tarea, dev, id_prev_container, id_curr_container);

    expect(tarea.dev_asignado).toBe('dev-url');
    expect(tarea.estado_tarea).toBe('BACKLOG');
  });

  it('should set task state as SPRINT when container is "contenedor_todo"', () => {
    spyOn(tareaService, 'putTarea');

    const tarea = {
      id: '123',
      dev_asignado: 'dev-url',
      estado_tarea: 'BACKLOG'
    };
    const dev = { url: 'dev-url' };
    const id_prev_container = 'contenedor_backlog';
    const id_curr_container = 'contenedor_todo';
    component.checkPO = false;

    component.cambiaEstadoTarea(tarea, dev, id_prev_container, id_curr_container);

    expect(tarea.dev_asignado).toBe('dev-url');
    expect(tarea.estado_tarea).toBe('SPRINT');
  });



  it('should log error message if container is not recognized', () => {
    spyOn(tareaService, 'putTarea');
    spyOn(console, 'log');

    const tarea = {
      id: '123',
      dev_asignado: 'dev-url',
      estado_tarea: undefined
    };
    const dev = { url: 'dev-url' };
    const id_prev_container = 'unknown-container';
    const id_curr_container = 'unknown-container';
    component.checkPO = false;

    component.cambiaEstadoTarea(tarea, dev, id_prev_container, id_curr_container);

    expect(tarea.dev_asignado).toBe('dev-url');
    expect(tarea.estado_tarea).toBeUndefined();
    expect(console.log).toHaveBeenCalledWith('No se ha podido identificar el estado de la tarea');
  });

  //objeto sala_put_service
  it('should create sala_put_service', () => {
    expect(salaPut).toBeTruthy();
  });

  it('should have correct properties', () => {
    expect(salaPut.id).toEqual('123');
    expect(salaPut.prod_owner).toEqual('prod_owner');
    expect(salaPut.devs).toEqual([
      { id: '1', usuario: 'dev1', url: 'url1', puntuacion: 5 }
    ]);
    expect(salaPut.nombre_sala).toEqual('nombre_sala');
    expect(salaPut.pass_sala).toEqual('pass_sala');
    expect(salaPut.url).toEqual('url');
  });

  it('should have toString method', () => {
    expect(typeof salaPut.toString).toEqual('function');
    expect(salaPut.toString()).toEqual('123');
  });

  //tarea_form
  it('debería asignar los valores de tarea al formulario', () => {
    const tarea = {
      id: 1,
      id_sala: 2,
      dev_asignado: 'John Doe',
      nombre_tarea: 'Tarea de ejemplo',
      desc_tarea: 'Descripción de la tarea',
      estado_tarea: 'En progreso',
      tiempo_estimado: 10,
      prioridad: 'ALTA',
      url: 'https://ejemplo.com',
    };

    component.setValuesFormEdit(tarea);

    expect(component.editarTareaForm.controls['id'].value).toEqual(tarea.id);
    expect(component.editarTareaForm.controls['id_sala'].value).toEqual(tarea.id_sala);
    expect(component.editarTareaForm.controls['dev_asignado'].value).toEqual(tarea.dev_asignado);
    expect(component.editarTareaForm.controls['nombre_tarea'].value).toEqual(tarea.nombre_tarea);
    expect(component.editarTareaForm.controls['desc_tarea'].value).toEqual(tarea.desc_tarea);
    expect(component.editarTareaForm.controls['estado_tarea'].value).toEqual(tarea.estado_tarea);
    expect(component.editarTareaForm.controls['tiempo_estimado'].value).toEqual(tarea.tiempo_estimado);
    expect(component.editarTareaForm.controls['prioridad'].value).toEqual(tarea.prioridad);
    expect(component.editarTareaForm.controls['url'].value).toEqual(tarea.url);
  });

  //get perfile dev
});
