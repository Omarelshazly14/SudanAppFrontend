import { TestBed } from '@angular/core/testing';

import { EntriesLocsService } from './entries-locs.service';

describe('EntriesLocsService', () => {
  let service: EntriesLocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntriesLocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
