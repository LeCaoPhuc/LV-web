import { Directive, ElementRef, Input, HostListener, EventEmitter } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[material-select]',
  outputs: ['materialSelectEmiter']
})
export class MaterialSelectDirective {
  public materialSelectEmiter: EventEmitter<any>;
  @Input() public ngModel: any;
  constructor(private el: ElementRef) {
    this.materialSelectEmiter = new EventEmitter();
  }

  ngOnInit() {
    console.log('----init')
    var self = this;
    setTimeout(function () {
      $(self.el.nativeElement).material_select(function () {
        self.materialSelectEmiter.next(self.el.nativeElement.value);
        self.ngModel = self.el.nativeElement.value;
      });
    }, 100);
  }
}
