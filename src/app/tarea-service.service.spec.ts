import { TestBed } from '@angular/core/testing';

import { TareaServiceService } from './tarea-service.service';

describe('TareaServiceService', () => {
  let service: TareaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
