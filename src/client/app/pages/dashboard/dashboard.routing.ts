import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeRoutes } from "./home/index";
import { UserRoutes } from "./user/index";
import { ShopRoutes } from "./shop/index";
import { ProductRoutes } from "./product/index";
import { OrderRoutes } from "./order/index";

export const DashboardRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		children: [
			...HomeRoutes,
			...UserRoutes,
			...ShopRoutes,
			...ProductRoutes,
			...OrderRoutes,
			// ...LoginRoutes
		]
	},
	// {
	// 	path: '',
	// 	redirectTo: 'dashboard/user'
	// }
]
