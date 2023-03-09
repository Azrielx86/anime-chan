import { TestBed } from '@angular/core/testing';

import { JikanAPIService } from './jikan-api.service';

describe('JikanAPIService', () => {
  let service: JikanAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JikanAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
