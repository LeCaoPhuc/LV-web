import { Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserDetailsComponent } from './user-details/index';

export const UserRoutes: Routes = [
	{
		path: 'user', 
		component: UserComponent,
	},
	{
		path: 'user/:id',
		component: UserDetailsComponent
	}
]
