import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-ss-totals',
  templateUrl: './spreadsheet-totals.component.html',
  styleUrls: ['./spreadsheet-totals.component.css']
})
export class SpreadsheetTotalsComponent implements OnInit {
  totals: any[];

  constructor() {}

  ngOnInit() {}

  setSpreadsheetData(rows: any[]) {
    this.totals = _.unzip(rows).map(column => {
      return column.reduce((sum, cell) => {
        return sum + parseFloat(cell);
      }, 0);
    });
  }
}
