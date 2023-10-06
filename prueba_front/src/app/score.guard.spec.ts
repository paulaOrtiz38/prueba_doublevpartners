import { TestBed } from '@angular/core/testing';

import { ScoreGuard } from './score.guard';

describe('ScoreGuard', () => {
  let guard: ScoreGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ScoreGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
