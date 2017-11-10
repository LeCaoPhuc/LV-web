import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details.component';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpRequestService } from '../../../../shared/index';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [OrderDetailsComponent],
  exports: [OrderDetailsComponent]
})
export class OrderDetailsModule { }
