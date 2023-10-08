import { TestBed } from '@angular/core/testing';

import { BuspathService } from './buspath.service';

describe('BuspathService', () => {
  let service: BuspathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuspathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
