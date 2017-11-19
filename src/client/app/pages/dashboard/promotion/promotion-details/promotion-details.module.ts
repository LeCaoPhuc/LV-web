import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PromotionDetailsComponent } from './promotion-details.component';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpRequestService, PipesModule } from '../../../../shared/index';
import { DirectiveModule } from '../../../../shared/directives/index';

@NgModule({
  imports: [FormsModule, SharedModule, CommonModule, DirectiveModule, PipesModule],
  declarations: [PromotionDetailsComponent],
  exports: [PromotionDetailsComponent]
})
export class PromotionDetailsModule { }
