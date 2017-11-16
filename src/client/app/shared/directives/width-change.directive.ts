import { Directive, ElementRef, Input, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[changeWidthHandle]',
  outputs: ['changeWidthEmiter']
})
export class ScrollDirective {
  public changeWidthEmiter: EventEmitter<any>;
  private scrolTop: any = 0;
  @Input() public floor: any = 0;
  @Input() public ceil: any = 0;
  constructor(private el: ElementRef) {
    this.changeWidthEmiter = new EventEmitter();

  }
  @HostListener('window:resize', ['$event']) onResize($event: any) {
    this.changeWidthEmiter.next({
      width: 0,
      hasChange: true
    })
  }
}
