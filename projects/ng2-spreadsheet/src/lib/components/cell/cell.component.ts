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

  @ViewChild('cell') cell: ElementRef;

  @Input() type = 'text';

  @Input() selected = false;

  @HostBinding('class.lastColumn')
  @Input() lastColumn = false;

  @HostBinding('class.lastRow')
  @Input() lastRow = false;

  @HostBinding('class.editable')
  @Input() editable = false;

  @Input() row: number;
  @Input() column: number;

  @Output() click: EventEmitter<any> = new EventEmitter();
  @Output() dblClick: EventEmitter<any> = new EventEmitter();

  value: string;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    setInterval(() => {
      // this.cdr.markForCheck();
    }, 1000);
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
