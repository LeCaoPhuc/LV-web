import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpRequestService } from '../../../shared/index';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '../../../shared/directives/index';
@NgModule({
  imports: [SharedModule, CommonModule,DirectiveModule,FormsModule],
  declarations: [ShopComponent],
  exports: [ShopComponent]
})
export class ShopModule { }
