import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spreadsheet';
  text = 'what';

  columns = [];

  constructor() {
    const cols = []
    for (let i = 0; i < 100; i++) {
      cols.push(i);
    }

    this.columns = cols.map(() => {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    });
  }
}
