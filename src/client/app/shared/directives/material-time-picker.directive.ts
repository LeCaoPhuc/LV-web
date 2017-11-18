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
  private done: string =  'Xong';
  private clear: string = 'Xóa';
  private cancel : string = 'Quay về';
  ngOnInit() {
    var self = this;
    setTimeout(function () {
      $(self.el.nativeElement).timepicker({
        doneText: self.done,
        clearText : self.clear,
        cancelText: self.cancel,
      });
    }, 100);

    self.el.nativeElement.onchange = function(event: any){
      // console.log(event);
      self.materialTimePickerEmiter.next(self.el.nativeElement.value);
      self.ngModel.update.emit(self.el.nativeElement.value);
    }
  }
}
