import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
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
import { ActivatedRoute, Router } from '@angular/router';
import { PaypalService } from '../paypal.service';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let activatedRoute: ActivatedRoute;
  let paypalService: PaypalService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
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
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: of({ PayerID: 'payerId', token: 'token' }) } }
      ]
    })
    .compileComponents();

    activatedRoute = TestBed.inject(ActivatedRoute);
    paypalService = TestBed.inject(PaypalService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CheckoutComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController?.verify();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call captureOrder and display data', () => {
    const mockResponse = { data: 'mockData' };
    spyOn(console, 'log');
    component.completaPago();

    const captureOrderRequest = httpTestingController?.expectOne(request => request?.url.includes('paypal/order/capture'));
    //expect(captureOrderRequest?.request.method).toBe('POST');
    //expect(captureOrderRequest?.request.body).toEqual({ payerID: 'payerId', token: 'token' });

    captureOrderRequest?.flush(mockResponse);

    expect(console.log).toHaveBeenCalledWith(mockResponse);
    expect(document.getElementById('btn_modal_confirmacion')).toBeTruthy();
  });
  it('should call click on btn_modal_cierre element', () => {
    const mockElement = jasmine.createSpyObj<HTMLElement>('mockElement', ['click']);
    spyOn(document, 'getElementById').and.returnValue(mockElement);

    component.cerrarModal();

    expect(document.getElementById).toHaveBeenCalledWith('btn_modal_cierre');
    expect(document.getElementById('btn_modal_cierre')?.click).toHaveBeenCalled();
  });

  it('should navigate to "/crear_sala" on onClose()', () => {
    spyOn(router, 'navigateByUrl');
    component.onClose();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/crear_sala');
  });
});