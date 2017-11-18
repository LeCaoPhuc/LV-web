import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialDetailsComponent } from './material-details.component';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpRequestService } from '../../../../shared/index';
import { DirectiveModule } from '../../../../shared/directives/index';

@NgModule({
  imports: [FormsModule, SharedModule, CommonModule, DirectiveModule],
  declarations: [MaterialDetailsComponent],
  exports: [MaterialDetailsComponent]
})
export class MaterialDetailsModule { }
