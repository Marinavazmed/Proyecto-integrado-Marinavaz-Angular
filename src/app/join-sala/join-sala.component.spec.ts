import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinSalaComponent } from './join-sala.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Observable, of } from 'rxjs';
import { UserProfileService } from '../user-profile.service';
import { Router } from '@angular/router';
import { ServiceSalasService } from '../service-salas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockUserProfileService {
  getPDPorUserAuth(): Observable<any> {
    const mockData = {
      id: 1,
      name: 'John Doe',
    };
    return of(mockData);
  }
}

describe('JoinSalaComponent', () => {
  let component: JoinSalaComponent;
  let fixture: ComponentFixture<JoinSalaComponent>;
  let serviceSalasService: ServiceSalasService;
  let userProfileService: UserProfileService;
  let router: Router;
  let joinSalaForm: FormGroup;
  const emptyDevsArray = new FormArray([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinSalaComponent],
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
        HttpClientModule,
      ],
      providers: [
        { provide: UserProfileService, useClass: MockUserProfileService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinSalaComponent);
    component = fixture.componentInstance;
    serviceSalasService = TestBed.inject(ServiceSalasService);
    userProfileService = TestBed.inject(UserProfileService);
    router = TestBed.inject(Router);
    joinSalaForm = new FormGroup({
      id: new FormControl(''),
      prod_owner: new FormControl(''),
      devs: new FormControl(null),
      nombre_sala: new FormControl('sala1'),
      pass_sala: new FormControl('password'),
      url: new FormControl(''),
    });
    component.joinSalaForm = joinSalaForm;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.joinSalaForm).toBeTruthy();
  });

  it('should call getPDPorUserAuth on component initialization', () => {
    spyOn(userProfileService, 'getPDPorUserAuth').and.returnValue(of({}));
    component.ngOnInit();
    expect(userProfileService.getPDPorUserAuth).toHaveBeenCalled();
  });

  it('should navigate to user-profile on successful submission', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const sala = { id: 1, prod_owner: 'owner' };
    spyOn(serviceSalasService, 'getSala').and.returnValue(of([sala]));
    component.joinSalaForm.setValue({
      id: '1',
      prod_owner: '',
      devs: null,
      nombre_sala: 'sala1',
      pass_sala: 'password',
      url: '',
    });
    component.onSubmit();
    expect(serviceSalasService.getSala).toHaveBeenCalledWith('sala1');
  });
});

describe('UserProfileService', () => {
  let service: UserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserProfileService],
    });
    service = TestBed.inject(UserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add more test cases for the other methods in UserProfileService
});