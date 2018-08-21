import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-ss-cell',
  templateUrl: './spreadsheet-cell.component.html',
  styleUrls: ['./spreadsheet-cell.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SpreadsheetCellComponent)
    }
  ]
})
export class SpreadsheetCellComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  @HostBinding('class.last-row') public lastRow = false;
  @HostBinding('class.first-cell') public firstCell = false;
  @HostBinding('class.last-cell') public lastCell = false;
  @HostBinding('class.selected') public selected = false;
  @HostBinding('class.editable') public editable = false;

  @HostBinding('class.readonly')
  @Input()
  readonly: boolean;

  @Input() childTemplate: TemplateRef<any>;
  @Input() type: string;
  @Input() allowedValues: any[];

  @Output() cellChange: EventEmitter<any> = new EventEmitter();
  @Output() click: EventEmitter<any> = new EventEmitter();
  @Output() dblClick: EventEmitter<any> = new EventEmitter();

  value: any;
  previousValue: any;
  openMenu = false;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit(): void {}

  setLastRow(val: boolean) {
    this.lastRow = val;
  }

  setLastCell(val: boolean) {
    this.lastCell = val;
  }

  setFirstCell(val: boolean) {
    this.firstCell = val;
  }

  setSelected(val: boolean) {
    this.selected = val;
    this.editable = this.selected && this.editable;
  }

  setEditable(val: boolean) {
    this.editable = val;
    if (val === true) {
    } else {
      if (!_.isEqual(this.value, this.previousValue)) {
        this.setValidatedValue();
        this.propagateChange(this.type === 'number' ? parseFloat(this.value) : this.value);
        this.cellChange.emit({
          previousValue: this.previousValue,
          currentValue: this.value
        });
        this.previousValue = _.cloneDeep(this.value);
      }
    }
  }

  onClick() {
    this.click.emit();
  }

  onDblClick() {
    this.dblClick.emit();
  }

  propagateChange = (x: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: any): void {
    this.value = obj;
    this.previousValue = _.cloneDeep(this.value);
  }

  clearValue(): void {
    if (!this.readonly) {
      this.value = null;
      this.previousValue = _.cloneDeep(this.value);
    }
  }

  setValidatedValue() {
    if (this.allowedValues) {
      if (!_.includes(this.allowedValues, this.value)) {
        const possibleMatches = this.allowedValues.filter(v => {
          return v.label.toLowerCase().search(String(this.value).toLowerCase()) > -1;
        });
        this.value = possibleMatches.length ? possibleMatches[0].value : this.allowedValues[0].value;
      }
    }
  }

  setOption(value) {
    this.value = value;
    this.openMenu = false;
  }
}
