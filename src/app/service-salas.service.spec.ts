import { TestBed } from '@angular/core/testing';

import { ServiceSalasService } from './service-salas.service';
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
import { inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ServiceSalasService', () => {
  let service: ServiceSalasService;
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
      providers: [ServiceSalasService]
    });
    service = TestBed.inject(ServiceSalasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should retrieve salas', () => {
    const mockSalas = [{ id: 1, nombre: 'Sala 1' }, { id: 2, nombre: 'Sala 2' }];

    service.getSalas().subscribe((salas: any[]) => {
      expect(salas.length).toBe(2);
      expect(salas).toEqual(mockSalas);
    });

    const req = httpMock.expectOne(service.url);
    expect(req.request.method).toBe('GET');
    req.flush(mockSalas);
  });

  it('should post sala', () => {
    const mockSala = { id: 1, nombre: 'Sala 1' };

    service.postSala(mockSala).subscribe((response: any) => {
      expect(response).toEqual(mockSala);
    });

    const req = httpMock.expectOne(service.url + 'api/v1/sala/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockSala);
    req.flush(mockSala);
  });

  it('should retrieve sala by nombre_sala', () => {
    const nombreSala = 'Sala 1';
    const mockSala = { id: 1, nombre: nombreSala };

    service.getSala(nombreSala).subscribe((sala: any) => {
      expect(sala).toEqual(mockSala);
    });

    const req = httpMock.expectOne(service.url + `api/v1/sala/?nombre_sala=${nombreSala}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSala);
  });
});
