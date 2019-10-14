import { TestBed } from '@angular/core/testing';

import { AcinterceptorService } from './acinterceptor.service';

describe('AcinterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcinterceptorService = TestBed.get(AcinterceptorService);
    expect(service).toBeTruthy();
  });
});
