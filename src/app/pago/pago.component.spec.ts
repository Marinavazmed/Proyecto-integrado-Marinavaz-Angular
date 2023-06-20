import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoComponent } from './pago.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { PaypalService } from '../paypal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PagoComponent', () => {
  let component: PagoComponent;
  let fixture: ComponentFixture<PagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoComponent ],
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
        HttpClientModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('PagoComponent', () => {
  let component: PagoComponent;
  let fixture: ComponentFixture<PagoComponent>;
  let httpClientSpy: { post: jasmine.Spy };
  let toastServiceMock: any;
  let paypalserviceMock: any;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    toastServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };
    paypalserviceMock = jasmine.createSpyObj('PaypalService', ['postCreaOrder']); // Crear objeto mock de PaypalService

    await TestBed.configureTestingModule({
      declarations: [PagoComponent],
      providers: [
        { provide: NgToastService, useValue: toastServiceMock },
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: PaypalService, useValue: paypalserviceMock } // Proveedor de PaypalService mock
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call postCreaOrder and display success toast for existing premium user', fakeAsync(() => {
    const error = 'Error status distinto de 200';
    paypalserviceMock.postCreaOrder.and.returnValue(of({ error })); // Configurar el comportamiento del mock

    component.PayPal();
    tick();

    expect(paypalserviceMock.postCreaOrder).toHaveBeenCalled();
    expect(toastServiceMock.success).toHaveBeenCalledWith({ detail: '¡Genial!', summary: 'Parece que ya eres premium', duration: 2500 });
  }));

  it('should call postCreaOrder and display error toast for unauthenticated user', fakeAsync(() => {
    const error = 'Debes autentificarte para poder obtener la membresia.';
    paypalserviceMock.postCreaOrder.and.returnValue(of({ error })); // Configurar el comportamiento del mock

    component.PayPal();
    tick();

    expect(paypalserviceMock.postCreaOrder).toHaveBeenCalled();
    expect(toastServiceMock.error).toHaveBeenCalledWith({ detail: 'Logeo requerido', summary: 'Autenticate para acceder', duration: 2500 });
  }));

  it('should call postCreaOrder and display error toast for other errors', fakeAsync(() => {
    const error = 'Some other error';
    paypalserviceMock.postCreaOrder.and.returnValue(of({ error })); // Configurar el comportamiento del mock

    component.PayPal();
    tick();

    expect(paypalserviceMock.postCreaOrder).toHaveBeenCalled();
    expect(toastServiceMock.error).toHaveBeenCalledWith({ detail: 'Ups', summary: 'Parece que algo ha salido mal', duration: 2500 });
  }));
});