import { TestBed } from '@angular/core/testing';

import { Ng2SpreadsheetService } from './ng2-spreadsheet.service';

describe('Ng2SpreadsheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ng2SpreadsheetService = TestBed.get(Ng2SpreadsheetService);
    expect(service).toBeTruthy();
  });
});
