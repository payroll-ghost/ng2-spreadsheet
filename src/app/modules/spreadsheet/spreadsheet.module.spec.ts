import { SpreadsheetModule } from './spreadsheet.module';

describe('SpreadsheetModule', () => {
  let spreadsheetModule: SpreadsheetModule;

  beforeEach(() => {
    spreadsheetModule = new SpreadsheetModule();
  });

  it('should create an instance', () => {
    expect(spreadsheetModule).toBeTruthy();
  });
});
