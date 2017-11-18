import { Routes } from '@angular/router';
import { MaterialComponent } from './material.component';
import { MaterialDetailsComponent } from './material-details/index';

export const MaterialRoutes: Routes = [
    {
        path: 'material',
        component: MaterialComponent,
    },
    {
        path: 'material/:id',
        component: MaterialDetailsComponent
    }
]
