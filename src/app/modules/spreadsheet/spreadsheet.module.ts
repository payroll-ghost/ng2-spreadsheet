import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpreadsheetComponent } from './spreadsheet.component';
import { CellComponent } from './components/cell/cell.component';
import { FormsModule } from '@angular/forms';
import { CellTextComponent } from './components/cell-text/cell-text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SpreadsheetComponent,
    CellComponent
  ],
  declarations: [SpreadsheetComponent, CellComponent, CellTextComponent]
})
export class SpreadsheetModule {

}
