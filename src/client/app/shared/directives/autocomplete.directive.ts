import { Directive, ElementRef, Input, HostListener, EventEmitter } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[social-autocomplete]',
  outputs: ['autoCompleteEmiter']
})
export class AutoCompleteDirective {
  public autoCompleteEmiter: EventEmitter<any>;
  @Input() public options: any;
  constructor(private el: ElementRef) {
    this.autoCompleteEmiter = new EventEmitter();
  }

  ngOnInit() {
    var self = this;
    if (this.options && this.options.list) {
      this.options.list.onClickEvent = function () {
        var selectedItem = $(self.el.nativeElement).getSelectedItemData();
        self.autoCompleteEmiter.next({ selectedItem: selectedItem });
      }
      this.options.list.onKeyEnterEvent = function () {
        var selectedItem = $(self.el.nativeElement).getSelectedItemData();
        self.autoCompleteEmiter.next({ selectedItem: selectedItem });
      }
    }
    $(this.el.nativeElement).easyAutocomplete(this.options);
  }
}
