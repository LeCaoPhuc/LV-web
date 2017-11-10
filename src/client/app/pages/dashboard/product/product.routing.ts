import { Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './product-details/index';

export const ProductRoutes: Routes = [
	{
		path: 'product', 
		component: ProductComponent,
	},
	{
		path: 'product/:id',
		component: ProductDetailsComponent
	}
]
