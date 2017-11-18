import { Directive, ElementRef, Input, HostListener, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $: any;
declare var M: any;
@Directive({
  selector: '[material-modal]',
  providers: [NgModel],
  outputs: ['materialModalEmiter']
})
export class MaterialmodalDirective {
  public materialModalEmiter: EventEmitter<any>;
  constructor(private el: ElementRef, private ngModel: NgModel) {
    this.materialModalEmiter = new EventEmitter();
  }

  ngOnInit() {
    var self = this;
    $(self.el.nativeElement).modal();
    var instance: any = new M.Modal(self.el.nativeElement, {
      ready: function(){
        self.materialModalEmiter.next({
          ready: true
        })
      },
      complete: function(){
        self.materialModalEmiter.next({
          reacompletedy: true
        })
      }
    });
    self.el.nativeElement.open = function(){
      instance.open();
    }
    self.el.nativeElement.close = function(){
      instance.close();
    }
  }
}
