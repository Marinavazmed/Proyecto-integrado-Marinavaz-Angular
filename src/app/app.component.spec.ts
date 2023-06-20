import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
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
import { po } from '../po';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from './auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  let router: Router;
  let toastService: NgToastService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        RouterTestingModule, 
        FontAwesomeModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [AuthService, NgToastService]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    toastService = TestBed.inject(NgToastService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PI'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PI');
  });
  it('should initialize the component', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{"id": 123}');
    spyOn(router, 'navigate');
    component.ngOnInit();
    expect(localStorage.getItem).toHaveBeenCalledWith('userData');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should toggle navbar collapsing', () => {
    component.toggleNavbarCollapsing();
    expect(component.navbarCollapsed).toBe(false);
    component.toggleNavbarCollapsing();
    expect(component.navbarCollapsed).toBe(true);
  });

  it('should log out and navigate to index', () => {
    spyOn(authService, 'logOut');
    spyOn(sessionStorage, 'removeItem');
    spyOn(router, 'navigate');
    component.logOut();
    expect(authService.logOut).toHaveBeenCalled();
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('perfilDEV');
    expect(router.navigate).toHaveBeenCalledWith(['/index']);
  });

  it('should navigate to profile', () => {
    spyOn(router, 'navigate');
    component.goToProfile();
    expect(router.navigate).toHaveBeenCalledWith(['/index']);
  });

  it('should navigate to salas', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{"id": 123}');
    spyOn(router, 'navigate');
    component.goToSalas();
    expect(localStorage.getItem).toHaveBeenCalledWith('userData');
    expect(router.navigate).toHaveBeenCalledWith(['/user-profile/123']);
  });

  it('should navigate to subscripcion', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{"id": 123}');
    spyOn(router, 'navigate');
    spyOn(toastService, 'warning');
    component.goToSubscripcion();
    expect(localStorage.getItem).toHaveBeenCalledWith('userData');
    expect(router.navigate).toHaveBeenCalledWith(['/pago']);
    expect(toastService.warning).not.toHaveBeenCalled();
  });

  it('should show warning toast when not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(toastService, 'warning');
    component.goToSubscripcion();
    expect(localStorage.getItem).toHaveBeenCalledWith('userData');
    expect(toastService.warning).toHaveBeenCalled();
  });

  it('should navigate to registro', () => {
    spyOn(router, 'navigate');
    component.goToRegistro();
    expect(router.navigate).toHaveBeenCalledWith(['/registro']);
  });

  it('should navigate to login', () => {
    spyOn(router, 'navigate');
    component.goToLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

});
describe('po', () => {
  it('should create an instance', () => {
    const id = '1';
    const usuario = 'JohnDoe';
    const url = 'http://example.com';
    const puntuacion = 5;

    const instance = new po(id, usuario, url, puntuacion);

    expect(instance).toBeTruthy();
    expect(instance.id).toEqual(id);
    expect(instance.usuario).toEqual(usuario);
    expect(instance.url).toEqual(url);
    expect(instance.puntuacion).toEqual(puntuacion);
  });

  it('should return the usuario string representation', () => {
    const id = '1';
    const usuario = 'JohnDoe';
    const url = 'http://example.com';
    const puntuacion = 5;

    const instance = new po(id, usuario, url, puntuacion);

    const expectedString = 'JohnDoe';
    const result = instance.toString();

    expect(result).toEqual(expectedString);
  });
  
});