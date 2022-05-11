import { TestBed } from '@angular/core/testing';

import { DevAuthGuard } from './dev-auth.guard';

describe('DevAuthGuard', () => {
  let guard: DevAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DevAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
