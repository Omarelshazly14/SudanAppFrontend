import { TestBed } from '@angular/core/testing';

import { MngDataService } from './mng-data.service';

describe('MngDataService', () => {
  let service: MngDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MngDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
