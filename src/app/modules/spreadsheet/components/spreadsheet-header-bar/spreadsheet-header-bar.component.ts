import { AfterContentInit, Component, ContentChildren, HostBinding, OnInit, QueryList } from '@angular/core';
import { SpreadsheetHeaderComponent } from '../spreadsheet-header/spreadsheet-header.component';

@Component({
  selector: 'app-ss-header-bar',
  templateUrl: './spreadsheet-header-bar.component.html',
  styleUrls: ['./spreadsheet-header-bar.component.css']
})
export class SpreadsheetHeaderBarComponent implements OnInit, AfterContentInit {
  @HostBinding('class.contents') contentOnly = true;
  @ContentChildren(SpreadsheetHeaderComponent) headers: QueryList<SpreadsheetHeaderComponent>;

  numberOfColumns = 0;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit(): void {
    this.headers.changes.subscribe(changedHeaders => {
      setTimeout(() => {
        this.setUpHeaders(changedHeaders);
      }, 0);
    });

    setTimeout(() => {
      this.setUpHeaders(this.headers);
    }, 0);
  }

  setUpHeaders(headers) {
    headers.forEach(h => h.setLastColumn(false));
    headers.last.setLastColumn(true);
    this.numberOfColumns = headers.length;
  }
}
