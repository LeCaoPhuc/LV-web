import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidateOnBlurDirective } from './input-onblur.directive';
import { ScrollDirective } from './scroll.directive';
import { TagsInputDirective } from './tagsinput.directive';
import { AutoCompleteDirective } from './autocomplete.directive';
import { CaretDetectDirective } from './caret-detect.directive';
import { DataClipboardTargetDirective } from './data-clipboard-target.directive';

@NgModule({
  imports: [FormsModule],
  declarations: [ValidateOnBlurDirective, ScrollDirective, TagsInputDirective, AutoCompleteDirective, CaretDetectDirective, DataClipboardTargetDirective],
  exports: [ValidateOnBlurDirective, ScrollDirective, TagsInputDirective, AutoCompleteDirective, CaretDetectDirective, DataClipboardTargetDirective]
})
export class DirectiveModule { }
