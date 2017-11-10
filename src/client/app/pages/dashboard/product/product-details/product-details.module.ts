import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpRequestService } from '../../../../shared/index';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [ProductDetailsComponent],
  exports: [ProductDetailsComponent]
})
export class ProductDetailsModule { }
