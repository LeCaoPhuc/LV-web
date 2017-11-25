import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserRoutes } from "./user/index";
import { ShopRoutes } from "./shop/index";
import { ProductRoutes } from "./product/index";
import { OrderRoutes } from "./order/index";
import { PromotionRoutes } from "./promotion/index";
import { MaterialRoutes } from "./material/index";
import { ColorRoutes } from "./color/index";
import { NotifyRoutes } from "./notify/index";

export const DashboardRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		children: [
			...UserRoutes,
			...ShopRoutes,
			...ProductRoutes,
			...OrderRoutes,
			...PromotionRoutes,
			...MaterialRoutes,
			...ColorRoutes,
			...NotifyRoutes
			// ...LoginRoutes
		]
	},
	// {
	// 	path: '',
	// 	redirectTo: 'dashboard/user'
	// }
]
