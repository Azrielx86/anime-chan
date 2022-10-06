import { TestBed } from '@angular/core/testing';

import { MarikaService } from './marika.service';

describe('MarikaService', () => {
  let service: MarikaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarikaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
