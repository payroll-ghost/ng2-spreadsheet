import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpreadsheetComponent } from './spreadsheet.component';
import { SpreadsheetHeaderComponent } from './components/spreadsheet-header/spreadsheet-header.component';
import { SpreadsheetFooterComponent } from './components/spreadsheet-footer/spreadsheet-footer.component';
import { SpreadsheetRowComponent } from './components/spreadsheet-row/spreadsheet-row.component';
import { SpreadsheetCellComponent } from './components/spreadsheet-cell/spreadsheet-cell.component';
import { SpreadsheetHeaderBarComponent } from './components/spreadsheet-header-bar/spreadsheet-header-bar.component';
import { FormsModule } from '@angular/forms';
import { FocusDirective } from './directives/focus.directive';
import { SpreadsheetTotalsComponent } from './components/spreadsheet-totals/spreadsheet-totals.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    SpreadsheetComponent,
    SpreadsheetHeaderComponent,
    SpreadsheetFooterComponent,
    SpreadsheetRowComponent,
    SpreadsheetCellComponent,
    SpreadsheetHeaderBarComponent,
    FocusDirective,
    SpreadsheetTotalsComponent
  ],
  exports: [
    SpreadsheetComponent,
    SpreadsheetHeaderBarComponent,
    SpreadsheetHeaderComponent,
    SpreadsheetFooterComponent,
    SpreadsheetRowComponent,
    SpreadsheetCellComponent,
    SpreadsheetTotalsComponent
  ]
})
export class SpreadsheetModule {}
