import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeRoutes } from "./home/index";
import { UserRoutes } from "./user/index";
import { ShopRoutes } from "./shop/index";
import { ProductRoutes } from "./product/index";

export const DashboardRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		children: [
			...HomeRoutes,
			...UserRoutes,
			...ShopRoutes,
			...ProductRoutes,
		]
	},
	// {
	// 	path: '',
	// 	redirectTo: 'dashboard/user'
	// }
]
