import { Routes } from '@angular/router';
import { PromotionComponent } from './promotion.component';
import { PromotionDetailsComponent } from './promotion-details/index';

export const PromotionRoutes: Routes = [
    {
        path: 'promotion',
        component: PromotionComponent,
    },
    {
        path: 'promotion/:id',
        component: PromotionDetailsComponent
    }
]
