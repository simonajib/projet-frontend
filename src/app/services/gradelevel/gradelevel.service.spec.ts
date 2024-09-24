import { TestBed } from '@angular/core/testing';

import { GradelevelService } from './gradelevel.service';

describe('GradelevelService', () => {
  let service: GradelevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradelevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
