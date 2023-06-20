import { TestBed } from '@angular/core/testing';

import { UserProfileService } from './user-profile.service';
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

describe('UserProfileService', () => {

  let service: UserProfileService;
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
      providers: [UserProfileService]
    });
    service = TestBed.inject(UserProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should obtain credentials from local storage', () => {
    const mockUserData = { id: '123', name: 'John Doe' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUserData));

    const credentials = service.obtenerCredenciales();

    expect(credentials).toEqual(mockUserData);
    expect(localStorage.getItem).toHaveBeenCalledWith('userData');
  });
  it('should retrieve user profile by userId', () => {
    const mockUserId = '123';
    const mockProfile = { id: 1, username: 'user123' };

    service.getUserProfile(mockUserId).subscribe((profile: any) => {
      expect(profile).toEqual(mockProfile);
    });

    const req = httpMock.expectOne(service.url + `api/v1/user/${mockUserId}/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
  });

  it('should retrieve user profile by username', () => {
    const mockUsername = 'user123';
    const mockProfile = { id: 1, username: mockUsername };

    service.getUserProfileByName(mockUsername).subscribe((profile: any) => {
      expect(profile).toEqual(mockProfile);
    });

    const req = httpMock.expectOne(service.url + `api/v1/user/?username=${mockUsername}/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
  });

  it('should post user', () => {
    const mockUser = { id: 1, username: 'user123' };

    service.postUser(mockUser).subscribe((response: any) => {
      expect(response).toEqual(mockUser);
    });

    const req = httpMock.expectOne(service.url + 'registro/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockUser);
  });


});
