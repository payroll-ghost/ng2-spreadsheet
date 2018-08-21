import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ss-footer',
  templateUrl: './spreadsheet-footer.component.html',
  styleUrls: ['./spreadsheet-footer.component.css']
})
export class SpreadsheetFooterComponent implements OnInit {
  @Output() csvClick: EventEmitter<any> = new EventEmitter();
  @Output() pdfClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  exportToCsv() {
    this.csvClick.emit();
  }

  exportToPdf() {
    this.pdfClick.emit();
  }
}
