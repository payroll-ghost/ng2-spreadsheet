import {
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  AfterContentInit,
  Input,
  HostListener,
  ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, OnChanges, SimpleChanges
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

  editable = false;

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
          this.setSelectedCell(location);
        });
      });
      console.log('marking');
      this.cdr.markForCheck();
    }, 0);
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
      this.highlight.nativeElement.style.top = (this.selectedCell.cell.nativeElement.offsetTop - 1) + 'px';
      this.highlight.nativeElement.style.left = (this.selectedCell.cell.nativeElement.offsetLeft - 1) + 'px';
      this.highlight.nativeElement.style.width = (this.selectedCell.cell.nativeElement.clientWidth - 0) + 'px';
      this.highlight.nativeElement.style.height = (this.selectedCell.cell.nativeElement.clientHeight + 0) + 'px';
    }
  }

  moveSelectedCell(row: number, column: number) {
    const potentialLocation = {column: this.selectedCellLocation.column + column, row: this.selectedCellLocation.row + row};

    potentialLocation.column = potentialLocation.column < 0 ? 0 : potentialLocation.column;
    potentialLocation.column = potentialLocation.column > this.lastColumn ? this.lastColumn : potentialLocation.column;
    potentialLocation.row = potentialLocation.row < 0 ? 0 : potentialLocation.row;
    potentialLocation.row = potentialLocation.row > this.lastRow ? this.lastRow : potentialLocation.row;

    this.setSelectedCell(potentialLocation);
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
      this.editable = true;
      if (this.selectedCell) {
        this.selectedCell.editable = this.editable;
      }
    }
  }
}
