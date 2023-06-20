import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when user data is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user data');
    const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;
    const result = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(result).toBe(true);
    expect(localStorage.getItem).toHaveBeenCalledWith('userData');
  });

  it('should navigate to login when user data is not present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'navigateByUrl');
    const routeSnapshot: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;
    const result = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(result).toBe(false);
    expect(localStorage.getItem).toHaveBeenCalledWith('userData');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});