import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { SpreadsheetHeaderComponent } from './components/spreadsheet-header/spreadsheet-header.component';
import { SpreadsheetHeaderBarComponent } from './components/spreadsheet-header-bar/spreadsheet-header-bar.component';
import { SpreadsheetRowComponent } from './components/spreadsheet-row/spreadsheet-row.component';
import { SpreadsheetCellComponent } from './components/spreadsheet-cell/spreadsheet-cell.component';
import { SpreadsheetFooterComponent } from './components/spreadsheet-footer/spreadsheet-footer.component';
import * as papaparse from 'papaparse';
import { SpreadsheetTotalsComponent } from './components/spreadsheet-totals/spreadsheet-totals.component';

@Component({
  selector: 'app-ss',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit, AfterContentInit {
  @ContentChild(SpreadsheetHeaderBarComponent) headerBar: SpreadsheetHeaderBarComponent;
  @ContentChildren(SpreadsheetRowComponent) rows: QueryList<SpreadsheetRowComponent>;
  @ContentChild(SpreadsheetTotalsComponent) totals: SpreadsheetTotalsComponent;
  @ContentChild(SpreadsheetFooterComponent) footer: SpreadsheetFooterComponent;

  @Output() spreadsheetChange: EventEmitter<any> = new EventEmitter();

  selectedRow = 0;
  selectedColumn = 0;
  selectedType: string;
  edit = false;
  newSelection = true;
  lastClickCoordinate = [0, 0];
  constructor() {}

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.rows.changes.subscribe(changedRows => {
      setTimeout(() => {
        this.setUpSpreadsheet(changedRows);
      }, 0);
    });
    setTimeout(() => {
      this.setUpSpreadsheet(this.rows);
    }, 0);
  }

  setUpSpreadsheet(rows) {
    if (rows && rows.last) {
      rows.last.setLastRow(true);
      rows.forEach((row, i) => {
        row.rowNumber = i;
        row.cells.forEach((cell, j) => {
          cell.click.subscribe(event => {
            this.newSelection = true;
            this.lastClickCoordinate = [i, j];
            this.moveSelection(i, j, true, true);
          });
          cell.dblClick.subscribe(event => {
            this.newSelection = true;
            this.lastClickCoordinate = [i, j];
            this.moveSelection(i, j, true, true);
            this.setEdit(true);
          });
        });
        row.rowChange.subscribe(event => {
          this.spreadsheetChange.emit({
            columnNumber: event.columnNumber,
            rowNumber: event.rowNumber,
            previousValue: event.previousValue,
            currentValue: event.currentValue
          });
        });
      });
      this.moveSelection(0, 0, true, true);

      if (this.totals) {
        const contentRows = this.rows.toArray().map(row => row.cells.toArray().map(cell => cell.value));
        this.totals.setSpreadsheetData(contentRows);
      }
      if (this.footer) {
        this.footer.csvClick.subscribe(() => this.exportToCsv());
        this.footer.pdfClick.subscribe(() => this.exportToPdf());
      }
    }
  }

  getSelectedCell(row?, column?): SpreadsheetCellComponent {
    return this.rows.toArray()[row || this.selectedRow].getCell(column || this.selectedColumn);
  }

  moveSelection(numberOfRows, numberOfColumns, absoluteRow?, absoluteCol?) {
    this.setEdit(false);
    this.getSelectedCell().setSelected(false);

    const desiredRow = Math.max(absoluteRow ? numberOfRows : this.selectedRow + numberOfRows, 0);
    const desiredCol = Math.max(absoluteCol ? numberOfColumns : this.selectedColumn + numberOfColumns, 0);

    if (this.selectedColumn === this.headerBar.numberOfColumns - 1 && desiredCol > this.selectedColumn) {
      this.selectedRow = (desiredRow + 1) % this.rows.length;
    } else {
      this.selectedRow = desiredRow % this.rows.length;
    }

    this.selectedColumn = desiredCol % this.headerBar.numberOfColumns;

    const selectedCell = this.getSelectedCell();
    selectedCell.setSelected(true);
    this.selectedType = selectedCell.type;
  }

  setEdit(val: boolean, writeNull?: boolean) {
    this.edit = val;
    this.getSelectedCell().setEditable(val);
    if (writeNull) {
      this.getSelectedCell().clearValue();
    }
  }

  isAlphaNumeric(charCode) {
    return (
      (charCode > 47 && charCode < 58) || // numeric (0-9)
      (charCode > 64 && charCode < 91) || // upper alpha (A-Z)
      (charCode > 96 && charCode < 123) || // lower alpha (a-z)
      charCode === 190
    ); // period
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (this.isAlphaNumeric(event.which)) {
      if (this.edit) {
      } else {
        if (this.selectedType === 'parent') {
          this.setEdit(true, false);
        } else {
          this.setEdit(true, true);
        }
      }
    } else if (event.code === 'Enter' && event.shiftKey) {
      if (this.selectedType === 'parent' && this.edit) {
      } else {
        this.moveSelection(-1, this.lastClickCoordinate[1], false, true);
        this.newSelection = true;
        event.preventDefault();
        if (this.edit) {
          this.setEdit(false);
        }
      }
    } else if (event.code === 'Enter' && (event.ctrlKey || event.metaKey)) {
      if (this.selectedType === 'parent' && this.edit) {
      } else {
        this.newSelection = true;
        this.setEdit(true);
      }
    } else if (event.code === 'Tab' && event.shiftKey) {
      if (this.selectedType === 'parent' && this.edit) {
      } else {
        this.newSelection = true;
        this.moveSelection(0, -1);
        event.preventDefault();
        if (this.edit) {
          this.setEdit(false);
        }
      }
    } else if (event.code === 'Enter') {
      if (this.selectedType === 'parent' && this.edit) {
      } else {
        this.moveSelection(1, this.lastClickCoordinate[1], false, true);
        this.newSelection = true;
        event.preventDefault();
        if (this.edit) {
          this.setEdit(false);
        }
      }
    } else if (event.code === 'Tab') {
      if (this.selectedType === 'parent' && this.edit) {
      } else {
        this.newSelection = true;
        this.moveSelection(0, 1);
        event.preventDefault();
        if (this.edit) {
          this.setEdit(false);
        }
      }
    } else if (event.code === 'ArrowLeft') {
      if (this.selectedType === 'parent' && this.edit) {
      } else {
        this.moveSelection(0, -1);
        this.newSelection = true;
        event.preventDefault();
        if (this.edit) {
          this.setEdit(false);
        }
      }
    } else if (event.code === 'ArrowRight') {
      if (this.selectedType === 'parent' && this.edit) {
      } else {
        this.moveSelection(0, 1);
        this.newSelection = true;
        event.preventDefault();
        if (this.edit) {
          this.setEdit(false);
        }
      }
    } else if (event.code === 'ArrowUp') {
      if (this.selectedType === 'parent' && this.edit) {
      } else {
        this.moveSelection(-1, 0);
        this.newSelection = true;
        event.preventDefault();
        if (this.edit) {
          this.setEdit(false);
        }
      }
    } else if (event.code === 'ArrowDown') {
      if (this.selectedType === 'parent' && this.edit) {
      } else {
        this.moveSelection(1, 0);
        this.newSelection = true;
        event.preventDefault();
        if (this.edit) {
          this.setEdit(false);
        }
      }
    } else if (event.code === 'Backspace') {
      if (this.edit) {
      } else {
        this.setEdit(false, true);
      }
    } else if (event.code === 'Space') {
      if (this.edit && this.selectedType === 'parent') {
        this.setEdit(false);
        event.preventDefault();
      }
    } else {
    }
  }

  exportToCsv() {
    const headerRow = [this.headerBar.headers.map(h => h.wrapper.nativeElement.innerText)];
    const contentRows = this.rows.toArray().map(row => row.cells.toArray().map(cell => cell.value));
    const rows = headerRow.concat(contentRows);
    const csv = new Blob([papaparse.unparse({ data: rows })], {
      type: 'text/csv'
    });

    if (csv) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(csv);
      a.download = name + '_' + new Date().toLocaleDateString();
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(a.href);
    }
  }

  exportToPdf() {}
}
