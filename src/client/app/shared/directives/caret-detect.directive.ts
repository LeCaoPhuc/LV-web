import { Directive, ElementRef, Input, HostListener, EventEmitter } from '@angular/core';
declare var $: any;
declare var document: any;
@Directive({
  selector: '[caret-detect]',
  outputs: ['caretDetectEmiter'],
})
export class CaretDetectDirective {
  public caretDetectEmiter: EventEmitter<any>;
  @Input() public options: any;
  constructor(private el: ElementRef) {
    this.caretDetectEmiter = new EventEmitter();
  }

  getCaretPixelPos($node: any, offsetx?: any, offsety?: any) {
    offsetx = offsetx || 0;
    offsety = offsety || 0;

    var nodeLeft = 0,
      nodeTop = 0;
    if ($node) {
      nodeLeft = $node.offsetLeft;
      nodeTop = $node.offsetTop;
    }

    var pos: any = { left: 0, top: 0 };

    if (document.selection) {
      var range = document.selection.createRange();
      pos.left = range.offsetLeft + offsetx - nodeLeft;
      pos.top = range.offsetTop + offsety - nodeTop;
    } else if (window.getSelection) {
      var sel = window.getSelection();
      var range: any = sel.getRangeAt(0).cloneRange();
      try {
        range.setStart(range.startContainer, range.startOffset - 1);
      } catch (e) { }
      var rect = range.getBoundingClientRect();
      if (range.endOffset == 0 || range.toString() === '') {
        if (range.startContainer == $node) {
          if (range.endOffset == 0) {
            pos.top = 0;
            pos.left = 0;
            pos.endOffset = range.endOffset;
          } else {
            // firefox need this
            var range2 = range.cloneRange();
            range2.setStart(range2.startContainer, 0);
            var rect2 = range2.getBoundingClientRect();
            pos.left = rect2.left + offsetx - nodeLeft;
            pos.top = rect2.top + rect2.height + offsety - nodeTop;
            pos.endOffset = range.endOffset;
            // pos.left = offsetx - nodeLeft + 'px';
            // pos.top = rect2.height + offsety - nodeTop + 'px';
          }
        } else {
          pos.top = range.startContainer.offsetTop;
          pos.left = range.startContainer.offsetLeft;
        }
      } else {
        pos.left = rect.left + rect.width + offsetx - nodeLeft;
        pos.top = rect.top + offsety - nodeTop;
        pos.endOffset = range.endOffset;
        // pos.left = rect.width + offsetx - nodeLeft + 'px';
        // pos.top = offsety - nodeTop + 'px';
      }
    }
    return pos;
  };

  ngOnInit() {
    var self = this;
    this.el.nativeElement.onkeyup = function(event: any){
      if(event.keyCode == 13) event.preventDefault();
      var pos = self.getCaretPixelPos(self.el.nativeElement);
      var rec: any = self.el.nativeElement.getBoundingClientRect();
      self.caretDetectEmiter.next({
        left: pos.left - rec.left,
        top: pos.top - rec.top,
        key: event.key,
        endOffset: pos.endOffset
      })
      // console.log(pos.left - rec.left);
      // console.log(pos.top - rec.top);
    }
  }
}
