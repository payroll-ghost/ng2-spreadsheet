import { NgModule } from '@angular/core';
import { CellComponent } from './components/cell/cell.component';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CellTextComponent} from './components/cell-text/cell-text.component';
import { FocusDirective } from './directives/focus.directive';
import { CellHeaderComponent } from './components/cell-header/cell-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CellComponent, SpreadsheetComponent, CellTextComponent, FocusDirective, CellHeaderComponent],
  exports: [SpreadsheetComponent, CellComponent]
})
export class Ng2SpreadsheetModule { }
