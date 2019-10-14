import { TestBed } from '@angular/core/testing';

import { GenauthService } from './genauth.service';

describe('GenauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenauthService = TestBed.get(GenauthService);
    expect(service).toBeTruthy();
  });
});
