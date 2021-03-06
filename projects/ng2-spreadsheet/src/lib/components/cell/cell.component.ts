import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ss-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => CellComponent)
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnInit {
  _selected = false;

  @ViewChild('cell') cell: ElementRef;

  @Input() type = 'text';

  @HostBinding('class.lastColumn')
  @Input() lastColumn = false;

  @HostBinding('class.lastRow')
  @Input() lastRow = false;

  @HostBinding('class.editable')
  _editable;

  @HostBinding('class.readonly')
  @Input() _readonly = false;

  @Input() row: number;
  @Input() column: number;

  @Output() click: EventEmitter<any> = new EventEmitter();
  @Output() dblClick: EventEmitter<any> = new EventEmitter();
  @Output() cellChange: EventEmitter<{oldValue: any, newValue: any}> = new EventEmitter();

  oldValue: string;
  value: string;

  constructor(public cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.readonly = !!this.readonly;
  }

  @Input('editable')
  set editable(value: boolean) {
    const newValue = value && !this.readonly;

    if (!this.editable && newValue) {
      this.oldValue = this.value;
    } else if (this.editable && !newValue && this.value !== this.oldValue) {
      this.propagateChange(this.value);
      this.cellChange.emit({
        newValue: this.value,
        oldValue: this.oldValue
      });
    }
    this._editable = newValue;
    this.cdr.markForCheck();
  }

  get editable(): boolean {
    return this._editable;
  }

  @Input('selected')
  set selected(value: boolean) {
    this._selected = value;
    this.cdr.markForCheck();
  }

  get selected(): boolean {
    return this._selected;
  }

  @Input('readonly')
  set readonly(value: boolean) {
    this._readonly = value || this.type === 'header';
  }

  get readonly(): boolean {
    return this._readonly;
  }

  onClick() {
    this.click.emit({row: this.row, column: this.column});
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.cdr.markForCheck();
  }

  propagateChange = (x: any) => {};
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }
}
