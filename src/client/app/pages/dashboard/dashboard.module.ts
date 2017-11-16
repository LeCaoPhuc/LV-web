import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { SharedModule, NavbarModule, FooterModule } from '../../shared/index';
import { HomeModule } from "./home/index";
import { UserModule } from "./user/index";
import { ShopModule } from "./shop/index";
import { ProductModule } from "./product/index";
import { OrderModule } from "./order/index";
@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    NavbarModule, 
    FooterModule, 
    HomeModule,
    UserModule,
    ShopModule,
    ProductModule,
    OrderModule,
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }