import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../../shared/shared.module';
import { HttpRequestService } from '../../../shared/index';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
