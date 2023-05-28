import { TestBed } from '@angular/core/testing';

import { TareasServiceService } from './tareas-service.service';

describe('TareasServiceService', () => {
  let service: TareasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
