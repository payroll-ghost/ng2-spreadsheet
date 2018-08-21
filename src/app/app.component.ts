import {ChangeDetectionStrategy, Component} from '@angular/core';
import { List, Range } from 'immutable';

@Component({
  selector: 'ss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text = 'what';
  rows: List<List<number>>;

  columns = [];

  constructor() {
    const columns: List<number> = List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const rows: List<List<number>> = List(Range(0, 13).map(x => columns));
    this.rows = rows;

    setTimeout(() => {
      console.log('changing');
      const columns2: List<number> = List([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      const rows2: List<List<number>> = List(Range(0, 10).map(x => columns2));
      this.rows = rows2;
    }, 20000);

  }
}
