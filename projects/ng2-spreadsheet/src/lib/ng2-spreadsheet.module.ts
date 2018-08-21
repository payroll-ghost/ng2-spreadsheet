import { NgModule } from '@angular/core';
import { CellComponent } from './components/cell/cell.component';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CellTextComponent} from './components/cell-text/cell-text.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CellComponent, SpreadsheetComponent, CellTextComponent],
  exports: [SpreadsheetComponent, CellComponent]
})
export class Ng2SpreadsheetModule { }
