import { TestBed } from '@angular/core/testing';

import { IdentityAdminService } from './identity-admin.service';

describe('IdentityAdminService', () => {
  let service: IdentityAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
