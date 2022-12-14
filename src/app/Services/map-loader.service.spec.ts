import { TestBed } from '@angular/core/testing';

import { BingMapsLoader } from './map-loader.service';

describe('BingMapsLoader', () => {
  let service: BingMapsLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingMapsLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
