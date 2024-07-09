import { TestBed } from '@angular/core/testing';

import { ServerconnectionService } from './services/serverconnection.service';

describe('ServerconnectionService', () => {
  let service: ServerconnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerconnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
