import { TestBed } from '@angular/core/testing';

import { ServiceSalasService } from './service-salas.service';

describe('ServiceSalasService', () => {
  let service: ServiceSalasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSalasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
