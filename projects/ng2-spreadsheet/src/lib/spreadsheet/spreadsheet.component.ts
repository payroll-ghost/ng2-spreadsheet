import {
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  AfterContentInit,
  Input,
  HostListener,
  ChangeDetectorRef, ViewChild, ElementRef, Output, EventEmitter
} from '@angular/core';
import {CellComponent} from '../components/cell/cell.component';

@Component({
  selector: 'ss-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit, AfterContentInit {
  @ContentChildren(CellComponent) cells: QueryList<CellComponent>;
  @ViewChild('highlight') highlight: ElementRef;

  @Input() numberOfColumns = 1;

  @Output() spreadsheetChange: EventEmitter<{
    row: number,
    column: number,
    oldValue: any,
    newValue: any
  }> = new EventEmitter();

  _editable = false;

  selectedCellLocation = { row: 0, column: 0 };
  selectedCell: CellComponent;

  lastColumn = 0;
  lastRow = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.cells.changes.subscribe(changes => {
      this.setupSpreadsheet();
    });
    this.setupSpreadsheet();
  }

  get editable() {
    return this._editable;
  }

  set editable(value: boolean) {
    this._editable = value;
    this.highlight.nativeElement.style.opacity = this.editable ? 0 : 1;
  }

  setupSpreadsheet() {
    this.lastColumn = this.numberOfColumns - 1;
    this.lastRow = Math.floor((this.cells.length - 1) / this.numberOfColumns);

    setTimeout(() => {
      this.cells.forEach((cell, i) => {
        const row = Math.floor(i / this.numberOfColumns);
        const column = i % this.numberOfColumns;

        cell.row = row;
        cell.column = column;

        if (column === this.lastColumn) {
          cell.lastColumn = true;
        }

        if (row === this.lastRow) {
          cell.lastRow = true;
        }

        this.setSelectedCell(this.selectedCellLocation);
      });

      this.cells.forEach((cell) => {
        cell.click.subscribe((location: {row: number, column: number}) => {
          this.moveSelectedCell(location.row, location.column, true);
        });
      });

      this.cells.forEach((cell) => {
        cell.cellChange.subscribe((result: {oldValue: any, newValue: any}) => {
          this.spreadsheetChange.emit({
            row: cell.row,
            column: cell.column,
            oldValue: result.oldValue,
            newValue: result.newValue
          });
        });
      });
      this.cdr.markForCheck();
    }, 0);
  }

  getCellAtLocation(location: {row: number, column: number}): CellComponent {
    return this.cells.toArray()[this.convertLocationToIndex(location)];
  }

  getCellAtIndex(index: number): CellComponent {
    return this.cells.toArray()[index];
  }

  normalizeLocation(location: {row: number, column: number}): {row: number, column: number} {
    return this.convertIndexToLocation(this.convertLocationToIndex(location));
  }

  convertLocationToIndex(location: {row: number, column: number}): number {
    console.log('location', location);
    return location.row * this.numberOfColumns + location.column;
  }

  convertIndexToLocation(index: number): {row: number, column: number} {
    return {
      row: Math.floor(index / this.numberOfColumns),
      column: index % this.numberOfColumns
    };
  }

  setSelectedCell(location: {row: number, column: number}) {
    this.editable = false;
    if (this.selectedCell) {
      this.selectedCell.selected = false;
      this.selectedCell.editable = this.editable;
    }

    this.selectedCellLocation = location;
    this.selectedCell = this.cells.toArray()[this.selectedCellLocation.row * this.numberOfColumns + this.selectedCellLocation.column];

    if (this.selectedCell) {
      this.selectedCell.selected = true;
      this.moveHighlight();
    }
  }

  moveSelectedCell(row: number, column: number, absolute = false) {
    let potentialLocation = {
      row: absolute ? row : this.selectedCellLocation.row + row,
      column: absolute ? column : this.selectedCellLocation.column + column,
    };

    potentialLocation.column = potentialLocation.column < 0 ? 0 : potentialLocation.column;
    potentialLocation.column = potentialLocation.column > this.lastColumn ? this.lastColumn : potentialLocation.column;
    potentialLocation.row = potentialLocation.row < 0 ? 0 : potentialLocation.row;
    potentialLocation.row = potentialLocation.row > this.lastRow ? this.lastRow : potentialLocation.row;

    if (!absolute) {
      while (this.getCellAtLocation(potentialLocation).readonly) {
        if (row !== 0) {
          const fixedLocation = { ...potentialLocation, row: potentialLocation.row + (row > 0 ? 1 : -1) };
          if (this.convertLocationToIndex(fixedLocation) > this.cells.length) {
            potentialLocation = this.selectedCellLocation;
            break;
          } else {
            potentialLocation = fixedLocation;
          }
        }
        if (column !== 0) {
          const fixedLocation = { ...potentialLocation, column: potentialLocation.column + (column > 0 ? 1 : -1) };
          if (this.normalizeLocation(fixedLocation).column !== fixedLocation.column) {
            potentialLocation = this.selectedCellLocation;
            break;
          } else {
            potentialLocation = fixedLocation;
          }
        }
      }
    } else {
      if (this.getCellAtLocation(potentialLocation).readonly) {
        potentialLocation = this.selectedCellLocation;
      }
    }

    potentialLocation = this.normalizeLocation(potentialLocation);

    this.setSelectedCell(potentialLocation);
  }

  moveHighlight() {
    this.highlight.nativeElement.style.top = (this.selectedCell.cell.nativeElement.offsetTop - 1) + 'px';
    this.highlight.nativeElement.style.left = (this.selectedCell.cell.nativeElement.offsetLeft - 1) + 'px';
    this.highlight.nativeElement.style.width = (this.selectedCell.cell.nativeElement.clientWidth - 0) + 'px';
    this.highlight.nativeElement.style.height = (this.selectedCell.cell.nativeElement.clientHeight + 0) + 'px';
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      this.moveSelectedCell(0, -1);
    }
    if (event.key === 'ArrowRight') {
      this.moveSelectedCell(0, 1);
    }
    if (event.key === 'ArrowUp') {
      this.moveSelectedCell(-1, 0);
    }
    if (event.key === 'ArrowDown') {
      this.moveSelectedCell(1, 0);
    }

    if (event.key === 'Enter') {
      event.stopPropagation();
      this.editable = true;
      if (this.selectedCell) {
        this.selectedCell.editable = this.editable;
        this.editable = this.selectedCell.editable;
      }
    }
  }
}
