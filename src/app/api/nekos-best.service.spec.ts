import { TestBed } from '@angular/core/testing';

import { NekosBestService } from './nekos-best.service';

describe('NekosBestService', () => {
  let service: NekosBestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NekosBestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
