import { AfterContentInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ss-header',
  templateUrl: './spreadsheet-header.component.html',
  styleUrls: ['./spreadsheet-header.component.css']
})
export class SpreadsheetHeaderComponent implements OnInit, AfterContentInit {
  @HostBinding('class.last-column') public lastColumn = false;
  @ViewChild('wrapper') wrapper: ElementRef;
  value: string;

  constructor() {}

  ngOnInit() {}

  setLastColumn(val: boolean) {
    this.lastColumn = val;
  }

  ngAfterContentInit(): void {
    this.value = this.wrapper.nativeElement.innerText;
  }
}
