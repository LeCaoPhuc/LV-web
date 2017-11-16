import { NgModule, Directive, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';


@Directive({
  selector: '[validate-onblur]',
  host: {
    '(focus)': 'onFocus($event)',
    '(blur)': 'onBlur($event)'
  },
  outputs: ['emiter']
})
export class ValidateOnBlurDirective {
  public emiter: EventEmitter<any>;
  constructor(public formControl: NgControl, public changeDetectorRef: ChangeDetectorRef, public el: ElementRef) {
    this.emiter = new EventEmitter();
  }

  onFocus($event: any) {
    this.formControl.control.markAsUntouched({ onlySelf: false });
    this.changeDetectorRef.detectChanges();
  }

  onBlur($event: any) {
    this.formControl.control.markAsTouched({ onlySelf: false });
    this.changeDetectorRef.detectChanges();
    this.el.nativeElement.errors = this.formControl.errors;
    this.emiter.next(this.formControl.errors);
  }
}
