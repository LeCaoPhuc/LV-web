import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpRequestService } from '../../../shared/index';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [ShopComponent],
  exports: [ShopComponent]
})
export class ShopModule { }
