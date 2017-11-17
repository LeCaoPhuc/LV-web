import { Directive, ElementRef, Input, HostListener, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $: any;
@Directive({
  selector: '[material-select]',
  providers: [NgModel],
  outputs: ['materialSelectEmiter']
})
export class MaterialSelectDirective {
  public materialSelectEmiter: EventEmitter<any>;
  constructor(private el: ElementRef, private ngModel: NgModel) {
    this.materialSelectEmiter = new EventEmitter();
  }

  ngOnInit() {
    var self = this;
    setTimeout(function () {
      $(self.el.nativeElement).material_select(function () {
        self.materialSelectEmiter.next(self.el.nativeElement.value);
        self.ngModel.update.emit(self.el.nativeElement.value);
      });
    }, 100);
  }
}
