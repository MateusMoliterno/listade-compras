import { TestBed } from '@angular/core/testing';

import { VazioService } from './vazio.service';

describe('VazioService', () => {
  let service: VazioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VazioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
