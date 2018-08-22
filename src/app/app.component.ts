import {ChangeDetectionStrategy, Component} from '@angular/core';
import { List, Range } from 'immutable';

@Component({
  selector: 'ss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users: any[];

  constructor() {
    this.users = [{
      name: 'Trent Jones',
      email: 'trentjones21@gmail.com',
      wages: [{
        amount: 500,
        name: 'Regular'
      }, {
        amount: 300,
        name: 'Overtime'
      }]
    }, {
      name: 'Trent Jones',
      email: 'trentjones21@gmail.com',
      readonly: true,
      wages: [{
        amount: 500,
        name: 'Regular'
      }, {
        amount: 300,
        name: 'Overtime'
      }]
    }, {
      name: 'Trent Jones',
      email: 'trentjones21@gmail.com',
      wages: [{
        amount: 500,
        name: 'Regular'
      }, {
        amount: 300,
        name: 'Overtime'
      }]
    }, {
      name: 'Trent Jones',
      email: 'trentjones21@gmail.com',
      wages: [{
        amount: 500,
        name: 'Regular'
      }, {
        amount: 300,
        name: 'Overtime'
      }]
    }, {
      name: 'Trent Jones',
      email: 'trentjones21@gmail.com',
      wages: [{
        amount: 500,
        name: 'Regular'
      }, {
        amount: 300,
        name: 'Overtime'
      }]
    }, {
      name: 'Trent Jones',
      email: 'trentjones21@gmail.com',
      wages: [{
        amount: 500,
        name: 'Regular'
      }, {
        amount: 300,
        name: 'Overtime'
      }]
    }];
  }

  onCellChange(event) {
    console.log('cell changed', event);
  }

  onSpreadsheetChange(event) {
    console.log('on spreadsheet change', event);
    console.log('this.users', this.users);
  }
}
