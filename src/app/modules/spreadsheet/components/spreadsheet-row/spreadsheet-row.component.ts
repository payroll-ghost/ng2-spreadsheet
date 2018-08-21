import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { SpreadsheetCellComponent } from '../spreadsheet-cell/spreadsheet-cell.component';

@Component({
  selector: 'app-ss-row',
  templateUrl: './spreadsheet-row.component.html',
  styleUrls: ['./spreadsheet-row.component.css']
})
export class SpreadsheetRowComponent implements OnInit, AfterContentInit {
  lastRow = false;
  rowNumber: number;

  @ContentChildren(SpreadsheetCellComponent) cells: QueryList<SpreadsheetCellComponent>;
  @Output() rowChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  getCell(column: number): SpreadsheetCellComponent {
    return this.cells.toArray()[column];
  }

  setLastRow(val: boolean) {
    this.lastRow = val;
    this.cells.forEach(cell => cell.setLastRow(this.lastRow));
  }

  setSelectedCell(column: number, isSelected: boolean) {
    this.cells.toArray()[column].setSelected(isSelected);
  }

  ngAfterContentInit(): void {
    this.cells.changes.subscribe(cells => {
      setTimeout(() => {
        this.setUpRow(cells);
      }, 0);
    });
    setTimeout(() => {
      this.setUpRow(this.cells);
    }, 0);
  }

  setUpRow(cells) {
    if (cells.last && cells.first) {
      cells.last.setLastCell(true);
      cells.first.setFirstCell(true);
      cells.forEach((cell, i) =>
        cell.cellChange.subscribe(event => {
          this.rowChange.emit({
            columnNumber: i,
            rowNumber: this.rowNumber,
            previousValue: event.previousValue,
            currentValue: event.currentValue
          });
        })
      );
    }
  }
}
