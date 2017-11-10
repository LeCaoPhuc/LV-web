import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardRoutes } from './pages/index';

@NgModule({
  imports: [
    RouterModule.forRoot([
      ...DashboardRoutes,
      { path: '**', redirectTo: '/dashboard' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

