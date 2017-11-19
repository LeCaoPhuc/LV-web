import { Routes } from '@angular/router';
import { ColorComponent } from './color.component';
import { ColorDetailsComponent } from './color-details/index';

export const ColorRoutes: Routes = [
    {
        path: 'color',
        component: ColorComponent,
    },
    {
        path: 'color/:id',
        component: ColorDetailsComponent
    }
]
