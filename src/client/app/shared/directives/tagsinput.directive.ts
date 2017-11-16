import { Directive, ElementRef, Input, HostListener, EventEmitter } from '@angular/core';
declare var $: any;
@Directive({
  selector: '[tags-input]',
  outputs: ['tagsInputEmiter']
})
export class TagsInputDirective {
  public tagsInputEmiter: EventEmitter<any>;
  @Input() public ngModel: any;
  @Input() public limit: any;
  constructor(private el: ElementRef) {
    this.tagsInputEmiter = new EventEmitter();
  }

  ngOnInit() {
    var self = this;
    if(self.limit) self.limit = parseInt(self.limit);
    function onAddTag(tag: any) {
      self.ngModel.push(tag);
      if(self.limit && self.ngModel.length >= self.limit){
        var addTag = $(self.el.nativeElement).next().find('input')[0];
        if(addTag){
          addTag.style.display = "none";
          addTag.readOnly = true;

        }
      }
		}
		function onRemoveTag(tag: any) {
      for(var i in self.ngModel){
        if(self.ngModel[i] == tag){
          self.ngModel.splice(i, 1);
          break;
        }
      }
      if(self.limit && self.ngModel.length < self.limit){
        var addTag = $(self.el.nativeElement).next().find('input')[0];
        if(addTag){
          addTag.style.display = "block";
          addTag.readOnly = false;
        }
      }
		}
		function onChangeTag(input: any, tag: any) {
			console.log("Changed a tag: " + tag);
		}
    if (this.ngModel) {
      $(this.el.nativeElement).val(this.ngModel.join(','));
    }
    $(this.el.nativeElement).tagsInput({
      placeholder: 'add a tag',
      onAddTag: onAddTag,
      onRemoveTag: onRemoveTag,
      onChangeTag: onChangeTag
    });
  }
}
