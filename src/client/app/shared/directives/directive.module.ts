import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidateOnBlurDirective } from './input-onblur.directive';
import { ScrollDirective } from './scroll.directive';
import { TagsInputDirective } from './tagsinput.directive';
import { AutoCompleteDirective } from './autocomplete.directive';
import { CaretDetectDirective } from './caret-detect.directive';
import { DataClipboardTargetDirective } from './data-clipboard-target.directive';
<<<<<<< HEAD
import { MaterialSelectDirective } from './material-select.directive'
import { MaterialTimePickerDirective } from './material-time-picker.directive'
@NgModule({
  imports: [FormsModule],
  declarations: [ValidateOnBlurDirective, ScrollDirective, TagsInputDirective, AutoCompleteDirective, CaretDetectDirective, DataClipboardTargetDirective, MaterialSelectDirective,MaterialTimePickerDirective],
  exports: [ValidateOnBlurDirective, ScrollDirective, TagsInputDirective, AutoCompleteDirective, CaretDetectDirective, DataClipboardTargetDirective, MaterialSelectDirective,MaterialTimePickerDirective]
=======
import { MaterialSelectDirective } from './material-select.directive';
import { MaterialmodalDirective } from './material-modal.directive';

@NgModule({
  imports: [FormsModule],
  declarations: [ValidateOnBlurDirective, ScrollDirective, TagsInputDirective, AutoCompleteDirective, CaretDetectDirective, DataClipboardTargetDirective, MaterialSelectDirective, MaterialmodalDirective],
  exports: [ValidateOnBlurDirective, ScrollDirective, TagsInputDirective, AutoCompleteDirective, CaretDetectDirective, DataClipboardTargetDirective, MaterialSelectDirective, MaterialmodalDirective]
>>>>>>> 17153117312a92f35c972dfa6f40f28c95838c7b
})
export class DirectiveModule { }
