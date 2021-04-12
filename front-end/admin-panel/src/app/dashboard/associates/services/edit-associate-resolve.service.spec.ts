import { TestBed } from '@angular/core/testing';

import { EditAssociateResolveService } from './edit-associate-resolve.service';

describe('EditAssociateResolveService', () => {
  let service: EditAssociateResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditAssociateResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
