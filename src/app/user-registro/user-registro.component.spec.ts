import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistroComponent } from './user-registro.component';
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
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { UserProfileService } from '../user-profile.service';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';

describe('UserRegistroComponent', () => {
  let component: UserRegistroComponent;
  let fixture: ComponentFixture<UserRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistroComponent ],
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
        ReactiveFormsModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('UserRegistroComponent', () => {
  let component: UserRegistroComponent;
  let fixture: ComponentFixture<UserRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistroComponent ],
      imports: [
        HttpClientModule, ReactiveFormsModule, FontAwesomeModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set pass_valid to false if pass length is less than 8', () => {
    const pass = '1234567'; // pass con longitud menor a 8
    const $event = { target: { value: '' } }; // objeto $event simulado

    component.checkPasswordConfirmacion(pass, $event);

    expect(component.checked).toBe(false);
  });

  it('should set pass_valid to true if pass length is 8 or greater', () => {
    const pass = '123456789'; // pass con longitud igual o mayor a 8
    const $event = { target: { value: '123456789' } }; // objeto $event simulado

    component.checkPasswordConfirmacion(pass, $event);
    expect(component.checked).toBe(true);
  });

  it('should set checked to false if pass does not match $event target value', () => {
    const pass = 'password'; // pass
    const $event = { target: { value: '12345678' } }; // valor diferente a pass

    component.checkPasswordConfirmacion(pass, $event);

    expect(component.checked).toBe(false);
  });

  it('should set checked to true if pass matches $event target value', () => {
    const pass = 'password'; // pass
    const $event = { target: { value: 'password' } }; // valor igual a pass

    component.checkPasswordConfirmacion(pass, $event);

    expect(component.checked).toBe(true);
  });
});
describe('UserRegistroComponent', () => {
  let component: UserRegistroComponent;
  let fixture: ComponentFixture<UserRegistroComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistroComponent ],
      imports: [ RouterTestingModule, HttpClientModule, ReactiveFormsModule, FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistroComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should navigate to the specified page', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Spy on the navigate method of the router
    const pageName = 'example-page';

    component.goToPage(pageName);

    expect(navigateSpy).toHaveBeenCalledWith([pageName]); // Verify that navigate was called with the correct page name
  });
});

describe('UserRegistroComponent', () => {
  let component: UserRegistroComponent;
  let fixture: ComponentFixture<UserRegistroComponent>;
  let userProfileService: UserProfileService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistroComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, FontAwesomeModule ],
      providers: [ UserProfileService, AuthService, FormBuilder ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistroComponent);
    component = fixture.componentInstance;
    userProfileService = TestBed.inject(UserProfileService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should hadle password confirmation error', fakeAsync(() => {
    const mockFormValue = {
      username: 'testuser',
      password: 'password',
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@example.com',
      created_at: new Date()
    };
    const mockResponse = { message: 'User created successfully' };
    spyOn(userProfileService, 'postUser').and.returnValue(of(mockResponse));
    spyOn(authService, 'logInUser');

    // Set form values
    component.registroForm.patchValue(mockFormValue);

    // Trigger form submission
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    if (submitButton) {
      const nativeButton = submitButton.nativeElement as HTMLButtonElement;
      nativeButton.click();
    }

    tick();
    expect(component.infoMessage).toBe('Las contraseña debe tener más de 8 caracteres y coincidir en ambos campos.');
    expect(component.errors).toEqual([]);
  }));

  it('should handle form validation errors', fakeAsync(() => {
    const mockFormValue = {
      username: 'testuser',
      password: 'password',
      first_name: 'John',
      last_name: 'Doe',
      email: 'test@example.com',
      created_at: new Date()
    };
    const mockValidationErrors:any= {
      username: 'Username is required',
      email: 'Email is invalid'
    };
    const mockErrorResponse = { error: mockValidationErrors };
    spyOn(userProfileService, 'postUser').and.returnValue(throwError(mockErrorResponse));

    // Set form values
    component.registroForm.patchValue(mockFormValue);

    // Trigger form submission
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    if (submitButton) {
      const nativeButton = submitButton.nativeElement as HTMLButtonElement;
      nativeButton.click();
    }

    tick();

    expect(component.infoMessage).toBe('Las contraseña debe tener más de 8 caracteres y coincidir en ambos campos.');
    expect(component.errors).toEqual([ ]);

    // Check form control errors
    Object.keys(mockValidationErrors).forEach(prop => {
      const formControl = component.registroForm.get(prop);
      expect(formControl?.errors).toBeNull();
    });
  }));
});