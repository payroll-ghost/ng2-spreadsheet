import {AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ss-cell-text',
  templateUrl: './cell-text.component.html',
  styleUrls: ['./cell-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CellTextComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellTextComponent implements OnInit {
  @Input() editable = false;

  value: string;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  onValueChange() {
    this.propagateChange(this.value);
  }

  writeValue(obj: any): void {
    this.value = (obj || '').toString();
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
