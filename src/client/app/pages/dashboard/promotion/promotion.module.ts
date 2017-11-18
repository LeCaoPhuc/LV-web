import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionComponent } from './promotion.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpRequestService, PipesModule } from '../../../shared/index';


@NgModule({
    imports: [SharedModule, CommonModule, PipesModule],
    declarations: [PromotionComponent],
    exports: [PromotionComponent]
})
export class PromotionModule { }
