import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpRequestService } from '../../../shared/index';
import { ProductDetailsModule } from './product-details/index';

@NgModule({
  imports: [SharedModule, CommonModule, ProductDetailsModule],
  declarations: [ProductComponent],
  exports: [ProductComponent]
})
export class ProductModule { }
