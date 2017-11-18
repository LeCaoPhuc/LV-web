import { Directive, ElementRef, Input, HostListener, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $: any;
@Directive({
  selector: '[material-timepicker]',
  providers: [NgModel],
  outputs: ['materialTimePickerEmiter']
})
export class MaterialTimePickerDirective {
  public materialTimePickerEmiter: EventEmitter<any>;
  constructor(private el: ElementRef, private ngModel: NgModel) {
    this.materialTimePickerEmiter = new EventEmitter();
  }

  ngOnInit() {
    var self = this;
    setTimeout(function () {
      $(self.el.nativeElement).timepicker();
    }, 100);

    self.el.nativeElement.onchange = function(event: any){
      // console.log(event);
      self.materialTimePickerEmiter.next(self.el.nativeElement.value);
      self.ngModel.update.emit(self.el.nativeElement.value);
    }
  }
}
