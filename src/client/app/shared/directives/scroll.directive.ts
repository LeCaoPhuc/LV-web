import { Directive, ElementRef, Input, HostListener, EventEmitter, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Directive({
  selector: '[scrollHandle]',
  outputs: ['scrollHandleEmiter']
})
export class ScrollDirective {
  public scrollHandleEmiter: EventEmitter<any>;
  private scrolTop: any = 0;
  private timeout: any;
  @Input() public floor: any = 0;
  @Input() public ceil: any = 0;
  constructor(private el: ElementRef, private zone: NgZone) {
    this.scrollHandleEmiter = new EventEmitter();

  }
  ngOnInit() {
    // console.log('-------scroll----------');
    var self = this;
    // Observable.fromEvent(this.el.nativeElement, 'scroll')
    // .debounceTime(20)
    // .subscribe(res => {
    //   var thisTag = self.el.nativeElement;
    //   var scrollTop = thisTag.scrollTop;
    //   var scrollHeight = thisTag.scrollHeight;
    //   var offsetHeight = thisTag.offsetHeight;
    //   self.scrollHandleEmiter.next({
    //     percent: scrollTop / (scrollHeight - offsetHeight) * 100,
    //     scrollingDown: scrollTop > self.scrolTop,
    //     scrollingUp: scrollTop < self.scrolTop,
    //     scrollToTop: scrollTop <= self.ceil,
    //     scrollToBottom: (scrollHeight - offsetHeight - scrollTop) <= self.floor,
    //     scrollTop: scrollTop
    //   });
    //   self.scrolTop = scrollTop;
    // });
    this.zone.runOutsideAngular(() => {
      Observable.fromEvent(this.el.nativeElement, 'scroll')
        .debounceTime(20)
        .subscribe(res => {
          var thisTag = self.el.nativeElement;
          var scrollTop = thisTag.scrollTop;
          var scrollHeight = thisTag.scrollHeight;
          var offsetHeight = thisTag.offsetHeight;
          self.scrollHandleEmiter.next({
            percent: scrollTop / (scrollHeight - offsetHeight) * 100,
            scrollingDown: scrollTop > self.scrolTop,
            scrollingUp: scrollTop < self.scrolTop,
            scrollToTop: scrollTop <= self.ceil,
            scrollToBottom: (scrollHeight - offsetHeight - scrollTop) <= self.floor,
            scrollTop: scrollTop
          });
          self.scrolTop = scrollTop;
        });
    });
  }
  // @HostListener('wheel', ['$event']) scrolling($event: any) {
  //   // console.log(this.el.nativeElement.)
  //   var self = this;
  //   var thisTag = self.el.nativeElement;
  //   var scrollTop = thisTag.scrollTop;
  //   var scrollHeight = thisTag.scrollHeight;
  //   var offsetHeight = thisTag.offsetHeight;
  //   if (self.timeout) {
  //     clearTimeout(self.timeout);
  //     self.timeout = undefined;
  //   }
  //   // self.timeout = setTimeout(function () {
  //   //   if (self.timeout) {
  //       self.scrollHandleEmiter.next({
  //         percent: scrollTop / (scrollHeight - offsetHeight) * 100,
  //         scrollingDown: scrollTop > self.scrolTop,
  //         scrollingUp: scrollTop < self.scrolTop,
  //         scrollToTop: scrollTop <= self.ceil,
  //         scrollToBottom: (scrollHeight - offsetHeight - scrollTop) <= self.floor,
  //         scrollTop: scrollTop
  //       });
  //       self.scrolTop = scrollTop;
  //       self.timeout = undefined;
  //   //   }
  //   // }, 100);
  // }
}
