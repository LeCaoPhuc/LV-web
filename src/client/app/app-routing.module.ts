import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardRoutes } from './pages/index';
import { LoginRoutes } from './pages/login/index';
@NgModule({
  imports: [
    RouterModule.forRoot([
      ...DashboardRoutes,
      ...LoginRoutes,
      { path: '**', redirectTo: '/login' },
      { path: '**', redirectTo: '/dashboard' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

