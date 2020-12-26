import { TestBed } from '@angular/core/testing';

import { DiamantesService } from './diamantes.service';

describe('DiamantesService', () => {
  let service: DiamantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiamantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
