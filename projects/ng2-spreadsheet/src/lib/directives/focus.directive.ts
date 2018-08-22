import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[ssFocus]'
})
export class FocusDirective implements AfterViewInit {
  private firstTime = true;
  constructor(public elem: ElementRef) {}

  ngAfterViewInit() {
    if (this.firstTime) {
      this.elem.nativeElement.focus();
      this.firstTime = false;
    }
  }
}
