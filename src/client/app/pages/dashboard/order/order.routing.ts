import { Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
export const OrderRoutes: Routes = [
	{
		path: 'order', 
		component: OrderComponent,
	},
	{
		path: 'order/:id',
		component: OrderDetailsComponent
	}
]
