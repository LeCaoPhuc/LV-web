import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './order-details.component';
import { OrderDetailsEditComponent } from '../order-details-edit/index';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpRequestService,PipesModule } from '../../../../shared/index';
import { DirectiveModule } from '../../../../shared/directives/index';
@NgModule({
  imports: [FormsModule, SharedModule, CommonModule, DirectiveModule,PipesModule],
  declarations: [OrderDetailsComponent, OrderDetailsEditComponent],
  exports: [OrderDetailsComponent]
})
export class OrderDetailsModule { }
