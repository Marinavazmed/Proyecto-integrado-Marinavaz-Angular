import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should not set logged in user if already logged in', () => {
    const username = 'testuser';
    const password = 'testpassword';

    service.isLoggedIn = true;

    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigateByUrl');

    service.logIn(username, password).subscribe((response) => {
      expect(response).toBeUndefined();
      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(service.isLoggedIn).toBe(true);
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });

    httpMock.expectOne(service.url + 'api-user-login/');
  });

  it('should log out and clear local storage', () => {
    spyOn(localStorage, 'removeItem');

    service.logOut();

    expect(localStorage.removeItem).toHaveBeenCalledWith('profile');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userData');
    expect(service.isLoggedIn).toBe(false);
  });
});