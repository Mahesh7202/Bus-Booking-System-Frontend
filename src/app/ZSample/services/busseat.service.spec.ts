import { TestBed } from '@angular/core/testing';

import { BusseatService } from './busseat.service';

describe('BusseatService', () => {
  let service: BusseatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusseatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
