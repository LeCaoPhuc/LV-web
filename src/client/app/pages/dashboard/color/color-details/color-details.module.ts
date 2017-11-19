import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ColorDetailsComponent } from './color-details.component';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpRequestService } from '../../../../shared/index';
import { DirectiveModule } from '../../../../shared/directives/index';
import { ColorPickerModule } from 'angular2-color-picker';

@NgModule({
  imports: [FormsModule, SharedModule, CommonModule, DirectiveModule, ColorPickerModule],
  declarations: [ColorDetailsComponent],
  exports: [ColorDetailsComponent]
})
export class ColorDetailsModule { }
