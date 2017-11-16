import { Directive, ElementRef, Input, HostListener, EventEmitter, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
declare var $: any;
declare var Clipboard: any;
@Directive({
  selector: '[dataClipboardTarget]',
  outputs: ['scrollHandleEmiter']
})
export class DataClipboardTargetDirective {
  public scrollHandleEmiter: EventEmitter<any>;
  private clipboard: any;
  @Input() clipboardTarget: any;
  @Input() clipboardTargetId: any;
  constructor(private el: ElementRef, private zone: NgZone) {
    this.scrollHandleEmiter = new EventEmitter();
  }
  ngOnInit() {
    this.el.nativeElement.setAttribute('data-clipboard-target', this.clipboardTarget);
    this.clipboard = new Clipboard('#' + this.clipboardTargetId);
  }

  ngOnDestroy(){
    if(this.clipboard && this.clipboard.destroy) this.clipboard.destroy();
  }
}
