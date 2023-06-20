import { TestBed } from '@angular/core/testing';

import { TareasServiceService } from './tareas-service.service';
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
import { AppRoutingModule } from './app-routing.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tarea } from './sala-main/tarea';

describe('TareasServiceService', () => {
  let service: TareasServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
      providers:[TareasServiceService]
    });
    service = TestBed.inject(TareasServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should retrieve tasks', () => {
    const mockResponse: any[] = [
      { id: 1, name: 'Task 1' },
      { id: 2, name: 'Task 2' }
    ];

    service.getTareas().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service.url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should post a task', () => {
    const tarea = { name: 'Task 1' };
    const mockResponse = { id: 1, name: 'Task 1' };

    service.postTarea(tarea).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const url = service.url + 'api/v1/tarea/';
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(tarea);
    req.flush(mockResponse);
  });

  it('should retrieve tasks by room name', () => {
    const nombreSala = 'Room 1';
    const mockResponse: any[] = [
      { id: 1, name: 'Task 1' },
      { id: 2, name: 'Task 2' }
    ];

    service.getTareasPorNombreSala(nombreSala).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const url = service.url + `api/v1/tarea/?id_sala__nombre_sala=${nombreSala}`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should delete a task', () => {
    const taskId = 1;

    service.deleteTarea(taskId).subscribe();

    const url = service.url + `api/v1/tarea/${taskId}/`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });



  it('should retrieve a task by ID', () => {
    const taskId = 1;
    const mockResponse = { id: 1, name: 'Task 1' };

    service.getTarea(taskId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const url = service.url + `api/v1/tarea/${taskId}/`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
