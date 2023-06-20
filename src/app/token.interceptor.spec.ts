import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptor]
    });
    interceptor = TestBed.inject(TokenInterceptor);
  });

  it('should add token to request headers', () => {
    const mockRequest = new HttpRequest('GET', '/api/data');
    const mockToken = 'mock-token';
    const mockUserData = { token: mockToken };

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUserData));

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(request.headers.has('Authorization')).toBeTrue();
        expect(request.headers.get('Authorization')).toBe(`Token ${mockToken}`);
        return of({} as HttpEvent<any>);
      }
    };

    const result = interceptor.intercept(mockRequest, next);
    expect(result).toBeTruthy();
  });

  it('should not add token to request headers if userData is not present', () => {
    const mockRequest = new HttpRequest('GET', '/api/data');

    spyOn(localStorage, 'getItem').and.returnValue(null);

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(request.headers.has('Authorization')).toBeFalse();
        return of({} as HttpEvent<any>);
      }
    };

    const result = interceptor.intercept(mockRequest, next);
    expect(result).toBeTruthy();
  });

  it('should not add token to request headers if userData does not contain token', () => {
    const mockRequest = new HttpRequest('GET', '/api/data');
    const mockUserData = {};

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUserData));

    const next: HttpHandler = {
      handle: (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(request.headers.has('Authorization')).toBeFalse();
        return of({} as HttpEvent<any>);
      }
    };

    const result = interceptor.intercept(mockRequest, next);
    expect(result).toBeTruthy();
  });
});
