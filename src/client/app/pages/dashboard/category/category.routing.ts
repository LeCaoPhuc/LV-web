import { Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryDetailComponent } from './category-detail/index';

export const CatgeoryRoutes: Routes = [
	{
		path: 'category', 
		component: CategoryComponent,
	},
	{
		path: 'category/:id',
		component: CategoryDetailComponent
	}
]
