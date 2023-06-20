import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
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
import { UserCredentials } from '../auth';
import { AuthService } from '../auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let authService: AuthService;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
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
      ],
      providers:[AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to the specified page', () => {
    const routerSpy = spyOn(component.router, 'navigate');
  
    component.goToPage('some-page');
  
    expect(routerSpy).toHaveBeenCalledWith(['some-page']);
  });
  it('should call logInUser if the form is valid', () => {
    const formData = {
      username: 'testuser',
      password: 'password',
    };
  
    spyOn(component, 'logInUser');
  
    component.logInForm.setValue(formData);
    component.onSubmit(formData);
  
    expect(component.logInUser).toHaveBeenCalledWith(formData);
  });
  
  it('should log form errors if the form is invalid', () => {
    spyOn(console, 'log');
    component.logInForm.setErrors({ someError: true });
    component.onSubmit({});
  
    expect(console.log).toHaveBeenCalledWith(component.logInForm.errors);
  });
  
  it('should handle login error and reset form', () => {
    const user: UserCredentials = {
      username: 'testuser',
      password: 'password',
    };
  
    spyOn(authService, 'logIn').and.returnValue(throwError('Invalid credentials'));
    spyOn(document, 'getElementById').and.returnValue({
      click: () => {} // Puedes dejar una función vacía o con una implementación mínima para simular el comportamiento del elemento HTML.
    } as HTMLElement);
    spyOn(component.logInForm, 'reset');
  
    component.logInUser(user);
  
    expect(authService.logIn).toHaveBeenCalledWith(user.username, user.password);
    expect(component.infoMessage).toBe('Credenciales incorrectas.');
    expect(document.getElementById).toHaveBeenCalledWith('openModalButton');
    expect(component.logInForm.reset).toHaveBeenCalled();
  });
});
