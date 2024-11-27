import { TestBed } from '@angular/core/testing';

import { BatchMasterService } from './batch-master.service';

describe('BatchMasterService', () => {
  let service: BatchMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
