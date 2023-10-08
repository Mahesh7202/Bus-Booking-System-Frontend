import { TestBed } from '@angular/core/testing';

import { SeatHelperService } from './seat-helper.service';

describe('SeatHelperService', () => {
  let service: SeatHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
