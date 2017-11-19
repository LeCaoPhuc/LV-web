import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './order.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpRequestService,PipesModule } from '../../../shared/index';
import { DirectiveModule } from '../../../shared/directives/index';
import { OrderDetailsModule } from './order-details/index';
@NgModule({
  imports: [SharedModule, CommonModule,FormsModule,DirectiveModule,PipesModule,OrderDetailsModule],
  declarations: [OrderComponent],
  exports: [OrderComponent]
})
export class OrderModule { }
