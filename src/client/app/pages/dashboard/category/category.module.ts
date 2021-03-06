import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  CategoryComponent } from './category.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpRequestService,PipesModule } from '../../../shared/index';
import { CategoryDetailModule } from "./category-detail/index";

@NgModule({
  imports: [SharedModule, CommonModule,PipesModule, CategoryDetailModule],//UserDetailsModule
  declarations: [CategoryComponent],
  exports: [CategoryComponent]
})
export class CategoryModule { }
