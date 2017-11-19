import { Directive, ElementRef, Input, HostListener, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $: any;
declare var M: any;
@Directive({
  selector: '[material-datepicker]',
  providers: [NgModel],
  outputs: ['materialDatePickerEmiter']
})
export class MaterialDatePickerDirective {
  public materialDatePickerEmiter: EventEmitter<any>;
  constructor(private el: ElementRef, private ngModel: NgModel) {
    this.materialDatePickerEmiter = new EventEmitter();
  }
  private today: string = 'Hôm nay';
  private clear: string = 'Xóa';
  private close: string = 'Đóng';

  @Input() public datePickerInput: any;

  ngOnInit() {
    var self = this;
    setTimeout(function () {
      $(self.el.nativeElement).datepicker({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: self.today,
        clear: self.clear,
        close: self.close,
        closeOnSelect: false // Close upon selecting a date,
      });
      var $sdInput = $(self.el.nativeElement).parent().find('input.sd-datepicker');
      if ($sdInput && $sdInput.length > 0) {
        $sdInput.click(function () {
          $(self.el.nativeElement).datepicker('open');
        });
      }
    }, 300);

    self.el.nativeElement.onchange = function (event: any) {
      self.ngModel.update.emit(self.el.nativeElement.value);
      self.materialDatePickerEmiter.next(self.el.nativeElement.value);
    }
  }

  ngOnChanges(changes: any) {
    var self = this;
    if (changes && changes.datePickerInput) {
      if (!changes.datePickerInput.firstChange) {
        $(self.el.nativeElement).datepicker('setDate', changes.datePickerInput.currentValue)
      }
    }
  }
}
