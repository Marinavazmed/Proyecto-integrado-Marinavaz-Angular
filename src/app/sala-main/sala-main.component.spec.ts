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
  let tareasService: jasmine.SpyObj<TareasServiceService>;
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
        providers: [ReactiveFormsModule, SalaMainComponent, { provide: UserProfileService, useValue: userServiceMock },         {
          provide: TareasServiceService,
          useValue: jasmine.createSpyObj('TareasServiceService', ['getTareasPorNombreSala'])
        }]
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
      tareasService = TestBed.inject(TareasServiceService) as jasmine.SpyObj<TareasServiceService>;
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

  /*component.tareas_obj = [
    {id:'11', id_sala:'5', dev_asignado: '', nombre_tarea:'', desc_tarea:'', estado_tarea:'', tiempo_estimado:'', prioridad: 'ALTA', url:'', fecha_creacion: new Date(), datos_user_dev: null, history:null},
    {id:'22', id_sala:'5', dev_asignado: '', nombre_tarea:'', desc_tarea:'', estado_tarea:'', tiempo_estimado:'', prioridad: 'MEDIA', url:'', fecha_creacion: new Date(), datos_user_dev: null, history:null},
    {id:'33', id_sala:'5', dev_asignado: '', nombre_tarea:'', desc_tarea:'', estado_tarea:'', tiempo_estimado:'', prioridad: 'BAJA', url:'', fecha_creacion: new Date(), datos_user_dev: null, history:null},
  ];*/
  it('should update percentages correctly', () => {
    // Arrange
    component.tareas_obj = [
      {id:'11', id_sala:'5', dev_asignado: '', nombre_tarea:'', desc_tarea:'', estado_tarea:'BACKLOG', tiempo_estimado:'', prioridad: 'ALTA', url:'', fecha_creacion: new Date(), datos_user_dev: null, history:null},
      {id:'22', id_sala:'5', dev_asignado: '', nombre_tarea:'', desc_tarea:'', estado_tarea:'SPRINT', tiempo_estimado:'', prioridad: 'MEDIA', url:'', fecha_creacion: new Date(), datos_user_dev: null, history:null},
      {id:'33', id_sala:'5', dev_asignado: '', nombre_tarea:'', desc_tarea:'', estado_tarea:'WIP', tiempo_estimado:'', prioridad: 'BAJA', url:'', fecha_creacion: new Date(), datos_user_dev: null, history:null},
      {id:'44', id_sala:'5', dev_asignado: '', nombre_tarea:'', desc_tarea:'', estado_tarea:'DONE', tiempo_estimado:'', prioridad: 'BAJA', url:'', fecha_creacion: new Date(), datos_user_dev: null, history:null},
    ];
    component.tareas_BACKLOG = [component.tareas_obj[0]];
    component.tareas_TODO = [component.tareas_obj[1]];
    component.tareas_WIP = [component.tareas_obj[2]];
    component.tareas_DONE = [component.tareas_obj[3]];

    // Act
    component.actualizaPorcentajes();

    // Assert
    expect(component.porcentaje_backlog).toBe(25);
    expect(component.porcentaje_todo).toBe(25);
    expect(component.porcentaje_wip).toBe(25);
    expect(component.porcentaje_done).toBe(25);
    expect(component.porcentaje_data_mayor).toBe(25);
    expect(component.porcentaje_data_menor).toBe(25);
  });

  it('should handle empty tasks correctly', () => {
    // Arrange
    component.tareas_obj = [];
    component.tareas_BACKLOG = [];
    component.tareas_TODO = [];
    component.tareas_WIP = [];
    component.tareas_DONE = [];

    // Act
    component.actualizaPorcentajes();

    // Assert
    expect(component.porcentaje_backlog).toBeNaN();
    expect(component.porcentaje_todo).toBeNaN();
    expect(component.porcentaje_wip).toBeNaN();
    expect(component.porcentaje_done).toBeNaN();
    expect(component.porcentaje_data_mayor).toBeNaN();
    expect(component.porcentaje_data_menor).toBeNaN();
  });
  
});

